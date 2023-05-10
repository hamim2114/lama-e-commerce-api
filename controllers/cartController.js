import CartModel from "../models/CartModel.js"

export const creatCart = async (req, res, next) => {
  const newCart = new CartModel(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart)
  } catch (error) {
    next(error)
  }
}

export const updateCart = async (req, res, next) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    res.status(200).json(updatedCart)
  } catch (error) {
    next(error)
  }
}

export const deleteCart = async (req, res, next) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).send('cart deleted!')
  } catch (error) {
    next(error)
  }
}

export const getUserCart = async (req, res,next) => {
  try {
    const cart = await CartModel.findOne({userId: req.params.userId});
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
}

export const getAllCart = async (req, res, next) => {
  try {
    const carts = await CartModel.find()
    res.status(200).json(carts)
  } catch (error) {
    next(error)
  }
}