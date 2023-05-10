import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { AuthRoute } from './routes/authRoute.js';
import { userRoute } from './routes/userRoute.js';
import { productRoute } from './routes/productRoute.js';
import { cartRoute } from './routes/cartRoute.js';
import { orderRoute } from './routes/orderRoute.js';
import { stripeRouter } from './routes/stripeRoute.js';

const PORT = 5000;
dotenv.config();
const app = express();

const connect = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL);
   } catch (error) {
      throw error;
   }
};

mongoose.connection.on('connected', () => {
   console.log('mongodb connected!');
});
mongoose.connection.on('disconnected', () => {
   console.log('mongodb disconnected!');
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
   console.log(`server connect on port ${PORT}`);
});
connect();

app.use('/api/auth/', AuthRoute)
app.use('/api/users/', userRoute)
app.use('/api/products/', productRoute)
app.use('/api/carts/', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRouter)


// app.use('/', (req, res) => {
//    res.send('server running!');
// });


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'something went wrong!'
  return res.status(status).json({
    success: false,
    status,
    message
  })
})