import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authroute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

//routes
app.use( authroute )
app.use(userRoute);

app.listen(PORT, () => console.log("Server running in port: " + PORT)) 