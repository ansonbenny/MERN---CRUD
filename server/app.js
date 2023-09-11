import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/config.js";

// routes 

import User from './routes/user.js'
import Vehicle from './routes/vehicle.js'

dotenv?.config?.()

const app = express()

const port = process.env.PORT || 5000

app.use("/files", express.static("files"))

app.use(cors({ credentials: true, origin: "*" }))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))

app.use('/api/user', User)
app.use('/api/vehicle', Vehicle)

app.listen(port, () => {
    connectDB((done, err) => {
        if (done) console.log("DB Connected");
        else console.log(`DB Connect Failed : ${err}`);
    });

    console.log("server started")
})