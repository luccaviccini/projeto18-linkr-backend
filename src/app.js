import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js";
import routes from "./routes/index.routes.js"
import postRoute from "./routes/timeline.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

//routes
app.use(userRoute);
app.use( routes )
app.use(postRoute)

app.listen(PORT, () => console.log("Server running in port: " + PORT)) 