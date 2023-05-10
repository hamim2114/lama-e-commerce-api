import express from 'express';
import { signin, signup } from '../controllers/authControllers.js';

export const AuthRoute = express.Router();

AuthRoute.post('/signup', signup)
AuthRoute.post('/signin', signin)