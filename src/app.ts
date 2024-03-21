import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import { connectToDatabase } from "./config/config.database"

const justifyRouter = require('./routes/justify.route')
const authenticationRouter = require('./routes/authentication.route')

dotevnv.config()

const app = express()

//setup express
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended : true}))
app.use(cors())

//setup routes
app.use('/api/justify', justifyRouter)
app.use('/api/token', authenticationRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connectToDatabase();

    console.log(`Server is listening on port ${PORT}`)
})
