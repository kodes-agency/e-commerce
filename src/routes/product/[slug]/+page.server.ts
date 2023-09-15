import { PUBLIC_API_ENDPOINT } from "$env/static/public";

export const load = async ({ fetch, params }) => {
  try {
    const response = await fetch(
      `${PUBLIC_API_ENDPOINT}/products/${params.slug}`
    );
    const product = await response.json();

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
        variations: variations
      }
    }
    return {
        product: product,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Something went wrong" } };
  }
};
