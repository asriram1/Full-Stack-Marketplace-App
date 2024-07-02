import { Order } from "@/app/_models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/_libs/authOptions";
// import { authOptions } from "../auth/[...nextauth]/route";
import { AdModel } from "@/app/_models/Ad";
import { authOptions } from "@/app/_libs/authOptions";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req: Request) {
  mongoose.connect(process.env.REACT_APP_MONGO_URL as string);

  const { cartProducts } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];

  for (const cartProduct of cartProducts) {
    const productInfo = await AdModel.findById(cartProduct._id);
    let productPrice: number = productInfo?.price || 0;

    const productTitle = cartProduct.title;
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productTitle,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  console.log(orderDoc._id.toString());
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    // success_url: "https://www.google.com",
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    // process.env.NEXTAUTH_URL +

    cancel_url: process.env.NEXTAUTH_URL + "/checkout-failure",
    // cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
  });
  console.log(stripeSession);
  return Response.json(stripeSession.url);
}
