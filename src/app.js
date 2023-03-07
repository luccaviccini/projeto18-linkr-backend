import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/index.router.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

//routes
app.use( router )

app.listen(PORT, () => console.log("Server running in port: " + PORT)) 