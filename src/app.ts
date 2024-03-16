import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"

dotevnv.config()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
