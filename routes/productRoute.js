import express from 'express';
import { verifyAdmin, verifyUserAndAdmin } from '../utils/verify.js';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController.js';

export const productRoute = express.Router();

productRoute.post('/', verifyAdmin, createProduct);

productRoute.put('/:id', verifyAdmin, updateProduct);

productRoute.delete('/:id', verifyAdmin, deleteProduct);

productRoute.get('/:id', getProduct);

productRoute.get('/', getAllProduct);