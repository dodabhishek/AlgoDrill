import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // or "*" for public access
  credentials: true,               // if you're using cookies/auth
}));
app.use(express.json());
app.use('/api/auth',authRoutes);


app.listen(PORT,()=>{   
   
    console.log(`Server is running on ${PORT}`);
    connectDB();
})