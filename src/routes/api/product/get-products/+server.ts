import { json } from "@sveltejs/kit";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export async function POST({ request,fetch }) {
  let searchString = await request.json()

  try {
    const response = await fetch(
        `${PUBLIC_API_ENDPOINT}/products?${searchString}`,
        {
        method: "GET",
        }
    );
    const jsonResponse = await response.json()
    return json({ products: jsonResponse});
  } catch (er: any) {
    return json({ error: er });
  }
}
