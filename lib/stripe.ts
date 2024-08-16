import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "E-Commerce Store",
    version: "1.0.0",
  },
  typescript: true,
});
