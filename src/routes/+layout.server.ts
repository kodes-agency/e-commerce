/** @type {import('@sveltejs/kit').Load} */
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { getClient } from "$lib/functions/getClient";
import query from "$lib/queries/layoutQuery.js";

export const load = async ({ fetch, cookies }) => {
  const response: any = await fetch(
    "https://shop.fragment.bg/wp-json/wc/store/v1/cart",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const responseCagtegories = await fetch(
    `${PUBLIC_API_ENDPOINT}/products/categories`
  );
  const productCategories = await responseCagtegories.json();

  cookies.set("nonce", response.headers.get("nonce"), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  });

  if (!cookies.get("cart-token")) {
    cookies.set("cart-token", response.headers.get("cart-token"), {
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  const layoutData = getClient().query({
    query: query(),
  });

  return {
    cart: response.json(),
    categories: productCategories,
    footer: layoutData,
  };
};
