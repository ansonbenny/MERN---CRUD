import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv?.config?.()

const app = express()

const port = process.env.PORT || 5000

app.use(express.static("files"))

app.use(cors({ credentials: true, origin: "*" }))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))

//app.use('/api',)

app.listen(port, () => {
    console.log("server started")
})