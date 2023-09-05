import { json } from "@sveltejs/kit";
import Stripe from "stripe";
import { SECRET_STRIPE_KEY } from "$env/static/private";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

// @ts-ignore
const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ cookies }) {
  const obj: any = {
    "Content-Type": "application/json",
  };

  cookies.getAll().forEach((cookie) => {
    obj[cookie.name] = cookie.value;
  });

  const responseGet = await fetch(`${PUBLIC_API_ENDPOINT}/cart`, {
    method: "GET",
    headers: obj,
  });

  const dataGet = await responseGet.json();

  const { totals, items } = await dataGet

  let purchaseDescription:string[] = []

  items.forEach((item:any)=>{
    let itemStr = ` product: ${item.name}, quantity: ${item.quantity} |`
    purchaseDescription.push(itemStr)
  })

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(totals.total_price),
    currency: "bgn",
    payment_method_types: ["card"],
    description: purchaseDescription.toString()
  });

  return json({
    clientSecret: paymentIntent.client_secret,
  });
}
