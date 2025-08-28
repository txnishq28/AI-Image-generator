import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import ImagiX from './routes/Imagix.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/ImagiX', ImagiX);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from ImagiX!',
  });
});
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const port = process.env.PORT || 9000; 
    app.listen(port, () => {
      console.log(`Server has started on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};


startServer()
