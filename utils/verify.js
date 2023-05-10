import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) return next(createError(401, 'you are not authenticated!'));

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(createError(403, 'token invalid!'));
      req.user = user;
      next();
   });
};

export const verifyUserAndAdmin = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
         next();
      } else {
         next(createError(403, 'you are not allowed!'));
      }
   });
};

export const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.isAdmin) {
         next();
      } else {
         return next(createError(403, 'You are not authorized!'));
      }
   });
};
