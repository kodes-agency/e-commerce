import { json } from "@sveltejs/kit";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export async function GET({ fetch }) {
  let minMaxPrice;
  try {
    minMaxPrice = await fetch(`
      ${PUBLIC_API_ENDPOINT}/products/collection-data?calculate_price_range=true`,
      {
        method: "GET"
      }
    );
    console.log(json(minMaxPrice))
    return json(minMaxPrice);
  } catch (er: any) {
    return json({ error: er });
  }
}
