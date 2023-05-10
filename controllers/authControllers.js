import Usermodel from '../models/Usermodel.js';
import User from '../models/Usermodel.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
   try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();
      res.status(200).send('User saved!');
   } catch (error) {
      next(error);
   }
};

export const signin = async (req, res, next) => {
   try {
      const user = await Usermodel.findOne({
         $or: [{ username: req.body.username }, { email: req.body.email }],
      });
      if (!user) return next(createError(404, 'wrong credentials!'));

      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) return next(createError(400, 'incorrect password!'));

      const token = jwt.sign(
         { id: user._id, isAdmin: user.isAdmin },
         process.env.JWT_SECRET,
         {expiresIn: "2d"}
      );

      const { password, ...others } = user._doc;

      res.cookie('access_token', token, { httpOnly: true })
         .status(200)
         .send(others);
   } catch (error) {
      next(error);
   }
};
