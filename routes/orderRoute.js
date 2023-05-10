import express from 'express';
import { verifyAdmin, verifyToken } from '../utils/verify.js';
import {
   creatOrder,
   deleteOrder,
   getAllOrders,
   getUserOrder,
   orderStats,
   updateOrder,
} from '../controllers/orderController.js';

export const orderRoute = express.Router();

orderRoute.post('/', verifyToken, creatOrder);

orderRoute.put('/:id', verifyAdmin, updateOrder);

orderRoute.delete('/:id', verifyAdmin, deleteOrder);

orderRoute.get('/find/:userId', verifyAdmin, getUserOrder);

orderRoute.get('/', verifyAdmin, getAllOrders);

orderRoute.get('/income', verifyAdmin, orderStats)
