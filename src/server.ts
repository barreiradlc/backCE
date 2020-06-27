import express from 'express'
import routes  from "./routes";
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const app = express()

mongoose.connect(String(process.env.MONGO_URI))

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT)