import express from 'express';
import { verifyAdmin, verifyUserAndAdmin } from '../utils/verify.js';
import { deleteUser, getAllUser, getUser, stats, updateUser } from '../controllers/userControllers.js';

export const userRoute = express.Router();

//UPDATE USER
userRoute.put('/:id', verifyUserAndAdmin, updateUser )

//DELETE USER
userRoute.delete('/:id', verifyUserAndAdmin, deleteUser)

//GET USER
userRoute.get('/find/:id', verifyAdmin, getUser)

//GET ALL USER
userRoute.get('/', verifyAdmin, getAllUser)

//GET STATS
userRoute.get('/stats', verifyAdmin, stats)