import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/connect.js'
import router from "./Routes/web.js"
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL;

//Database Connection
connectDB(DATABASE_URL);

const app = express()

app.use(express.json());
app.use(cors())

app.use('/shop', router);

app.listen(PORT, ()=>{
 console.log(`Development server start at : http://localhost:${PORT}`)
});
