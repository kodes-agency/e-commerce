import { PUBLIC_API_ENDPOINT, PUBLIC_STRAPI_ENDPOINT } from "$env/static/public";

export const load = async ({ fetch }) => {
  const getProducts = async () => {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/products?featured=true`);
    const products = await response.json();
    return products;
  };

  const getCategories = async () => {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/products/categories`);
    const categories = await response.json();
    return categories;
  };

  const getPage = async () => {
    const response = await fetch(`${PUBLIC_STRAPI_ENDPOINT}/?populate=*`);
    const page = await response.json();
    return page;
  };

  try {
    const [products, categories, page] = await Promise.all([getProducts(), getCategories(), getPage()])

    return {
      status: 200,
      products: products,
      categories: categories,
      page: page
    };
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Something went wrong" } };
  }
};
