import { json } from "@sveltejs/kit";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export async function POST({ request, fetch }) {
  const variationIds = await request.json();

  let data;

  try {
    data = await Promise.all(
      variationIds.map(async (variation: any) => {
        const response = await fetch(
          `${PUBLIC_API_ENDPOINT}/products/${variation}`,
          {
            method: "GET",
          }
        );
        return await response.json();
      })
    );
    return json(data);
  } catch (er: any) {
    return json({ error: er });
  }
}
