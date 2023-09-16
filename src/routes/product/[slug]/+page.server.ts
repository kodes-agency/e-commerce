import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export const load = async ({ fetch, params }) => {
  try {

    const getProducts = async () =>{{
      const response = await fetch(
        `${PUBLIC_API_ENDPOINT}/products?page=1&per_page=20`
      );
  
      const products = response.json()

      return products
    }}

    const getSingleProduct = async () =>{{
      const response = await fetch(
        `${PUBLIC_API_ENDPOINT}/products/${params.slug}`
      );
      const product = await response.json();

      return product
    }}


    const [products, product] = await Promise.all([getProducts(), getSingleProduct()])

    // @ts-ignore
    const featuredProducts = products.filter(product=>{return decodeURIComponent(product.slug) !== params.slug}).sort(() => 0.5 - Math.random()).slice(0,4)

    if(product.variations.length > 0) {
      const variationsIds = product.variations.map((variation:any)=>{
        return variation.id
      })
      const responseVariations = await fetch("/api/product/get-variation", {
        method: "POST",
        body: JSON.stringify(variationsIds),
      })

      const variations = await responseVariations.json()

      return {
        product: product,
        variations: variations,
        products: featuredProducts
      }
    }
    return {
        product: product,
        products: featuredProducts
    };
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Something went wrong" } };
  }
};
