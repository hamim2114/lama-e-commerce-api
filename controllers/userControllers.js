import bcrypt from 'bcryptjs';
import Usermodel from '../models/Usermodel.js';

export const updateUser = async (req, res, next) => {
   if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash; //assign new password with hash
   }
   try {
      const updatedUser = await Usermodel.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );
      res.status(200).json(updatedUser);
   } catch (error) {
      next(error);
   }
};

export const deleteUser = async (req, res, next) => {
   try {
      await Usermodel.findByIdAndDelete(req.params.id);
      res.status(200).send('user deleted!');
   } catch (error) {
      next(error);
   }
};

export const getUser = async (req, res, next) => {
   try {
      const user = await Usermodel.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
   } catch (error) {
      next(error);
   }
};
export const getAllUser = async (req, res, next) => {
   const query = req.query.new;
   try {
      const users = query
         ? await Usermodel.find().sort({ _id: -1 }).limit(5) //find latest users
         : await Usermodel.find();
      res.status(200).json(users);
   } catch (error) {
      next(error);
   }
};

export const stats = async (req, res, next) => {
   const date = new Date();
   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
   try {
      const data = await Usermodel.aggregate([
         { $match: { createdAt: { $gte: lastYear } } },
         { $project: { month: { $month: '$createdAt' } } },
         { $group: { _id: '$month', total: { $sum: 1 } } },
      ]);
      res.status(200).json(data)
   } catch (error) {
      next(error);
   }
};
