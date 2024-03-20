import mongoose from 'mongoose'

interface IUser {
    email: string,
    token: string,
    registered: boolean,
    dailyLimit: {
        date: string,
        dailyWord: number
    }
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(attr: IUser): UserDoc
}

interface UserDoc extends mongoose.Document {
    email: string,
    token: string,
    registered: boolean,
    dailyLimit: {
        date: string,
        dailyWord: number
    }
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique:true,
        index:true,
    },
    token: {
        type: String, 
        required: true,
        unique:true,
        index:true,
    },
    registered: {
        type: Boolean,
        required: false,
        default: false
    },
    dailyLimit: {
        date: {
            type: String,
            required: false,
            default: new Date().toDateString()
        },
        dailyWord: {
            type: Number,
            required: false,
            default: 0
        },
    }
})

userSchema.statics.build = (attr: IUser) => {
    return new User(attr)
}

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema)


export { User }