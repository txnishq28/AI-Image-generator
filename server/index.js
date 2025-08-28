import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './MongoDB/connect.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit : '60mb'}));

app.get('/',async(req,res) => {
    res.send('Hello from Image Generator')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(9000 , () => {
        console.log('Server has started on port http://localhost:9000')
    })
    } catch (error) {
        console.log(error);
    }
}

startServer()