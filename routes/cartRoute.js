import express from 'express';
import { verifyAdmin, verifyToken, verifyUserAndAdmin } from '../utils/verify.js';
import { creatCart, deleteCart, getAllCart, getUserCart, updateCart } from '../controllers/cartController.js';

export const cartRoute = express.Router();

cartRoute.post('/', verifyToken, creatCart)

cartRoute.put('/:id', verifyUserAndAdmin, updateCart)

cartRoute.delete('/:id', verifyUserAndAdmin, deleteCart)

cartRoute.get('/find/:userId', verifyUserAndAdmin, getUserCart) //find user cart, every user have own cart and cart have user id

cartRoute.get('/', verifyAdmin, getAllCart)