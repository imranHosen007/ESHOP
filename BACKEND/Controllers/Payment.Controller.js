import express from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_KEY);
const router = express.Router();

router.post("/procces", async (req, res) => {
  const { price } = req.body;

  const amount = price;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    metadata: {
      company: "imranhossain",
    },
  });
  res.send({
    client_secret: paymentIntent.client_secret,
  });
});

router.get("/stripeapikey", async (req, res) => {
  res.status(200).json({
    stripeApikey: process.env.STRIPE_API_KEY,
  });
});
export default router;
