import ProductModel from '../models/ProductModel.js';

export const createProduct = async (req, res, next) => {
   const newProduct = new ProductModel(req.body);
   try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
   } catch (error) {
      next(error);
   }
};
export const updateProduct = async (req, res, next) => {
   try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true }
      );
      res.status(200).json(updatedProduct);
   } catch (error) {
      next(error);
   }
};
export const deleteProduct = async (req, res, next) => {
   try {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json('product deleted!');
   } catch (error) {
      next(error);
   }
};
export const getProduct = async (req, res, next) => {
   try {
      const product = await ProductModel.findById(req.params.id);
      res.status(200).json(product);
   } catch (error) {
      next(error);
   }
};
export const getAllProduct = async (req, res, next) => {
   const qNew = req.query.new;
   const qCategory = req.query.category;
   try {
      let products;
      if (qNew) {
         products = await ProductModel.find().sort({ createdAt: -1 }).limit(5);
      } else if (qCategory) {
         products = await ProductModel.find({
            categories: {
               $in: [qCategory],
            },
         });
      } else {
         products = await ProductModel.find();
      }
      res.status(200).json(products);
   } catch (error) {
      next(error);
   }
};
