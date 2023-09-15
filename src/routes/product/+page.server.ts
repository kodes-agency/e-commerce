import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { filterMinMax } from "$lib/store/store.js";
import { priceFormat } from "$lib/functions/global/priceFormat.js";

export const load = async ({ fetch, url }) => {
  let serachString = `/products?page=1&per_page=100&${
    url.searchParams.get("category")
      ? "&category=" + url.searchParams.get("category")
      : ""
  }${
    url.searchParams.get("min_price")
      ? "&min_price=" + url.searchParams.get("min_price")
      : ""
  }${
    url.searchParams.get("max_price")
      ? "&max_price=" + url.searchParams.get("max_price")
      : ""
  }${
    url.searchParams.get("order")
      ? "&order=" + url.searchParams.get("order")
      : ""
  }${
    url.searchParams.get("orderby")
      ? "&orderby=" + url.searchParams.get("orderby")
      : ""
  }`;

  const priceRange = async () => {
    const response = await fetch(
      `${PUBLIC_API_ENDPOINT}/products/collection-data?calculate_price_range=true`
    );
    const productPriceRange = await response.json();
    return productPriceRange;
  };

  const products = async () => {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}${serachString}`);
    const productsAll = await response.json();
    return productsAll;
  };

  try {
    const [productPriceRange, productsAll] = await Promise.all([
      priceRange(),
      products(),
    ]);
    const { min_price, max_price } = productPriceRange.price_range;
    let min = Math.round(Number(priceFormat(min_price)) - 1);
    let max = Math.round(Number(priceFormat(max_price)) + 1);
    filterMinMax.set([min, max, 0, 100]);

    return {
      status: 200,
      products: productsAll,
      filters: {
        price: {
          min: min,
          max: max,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Something went wrong" } };
  }
};
