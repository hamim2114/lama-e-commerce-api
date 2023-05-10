import express from 'express';
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.STRIPE_SECRET);

export const stripeRouter = express.Router();

stripeRouter.post('/payment', (req, res, next) => {
  stripe.charges.create(
      {
         source: req.body.tokenId,
         amount: req.body.amount,
         currency: 'usd',
      },
      (stripeErr, stripeRes) => {
         if (stripeErr) {
            next(stripeErr);
         } else {
            res.status(200).json(stripeRes);
         }
      }
   );
});
