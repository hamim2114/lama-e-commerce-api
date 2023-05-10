import OrderModel from '../models/OrderModel.js';

export const creatOrder = async (req, res, next) => {
   const newOrder = new OrderModel(req.body);
   try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
   } catch (error) {
      next(error);
   }
};

export const updateOrder = async (req, res, next) => {
   try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );
      res.status(200).json(updatedOrder);
   } catch (error) {
      next(error);
   }
};

export const deleteOrder = async (req, res, next) => {
   try {
      await OrderModel.findByIdAndDelete(req.params.id);
      res.status(200).send('orders deleted!');
   } catch (error) {
      next(error);
   }
};

export const getUserOrder = async (req, res, next) => {
   try {
      const orders = await OrderModel.find({ userId: req.params.userId });
      res.status(200).json(orders);
   } catch (error) {
      next(error);
   }
};

export const getAllOrders = async (req, res, next) => {
   try {
      const orders = await OrderModel.find();
      res.status(200).json(orders);
   } catch (error) {
      next(error);
   }
};

export const orderStats = async (req, res, next) => {
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
   const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
   );
   try {
      const income = await OrderModel.aggregate([
         {
            $match: {
               createdAt: { $gte: previousMonth },
            },
         },
         {
            $project: {
               month: { $month: '$createdAt' },
               sales: '$amount',
            },
         },
         {
            $group: {
               _id: '$month',
               total: { $sum: '$sales' },
            },
         },
      ]);
      res.status(200).json(income);
   } catch (error) {
      next(error);
   }
};
