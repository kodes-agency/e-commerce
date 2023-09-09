import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { filterMinMax } from '$lib/store/store.js';
import { priceFormat } from '$lib/functions/global/priceFormat.js';


export const load = async ({fetch}) => {
  async function getData(){
    const response = await fetch("https://shop.fragment.bg/wp-json/wc/store/v1/products/collection-data?calculate_price_range=true", {
        method: "GET",
        headers: {
          Nonce: '',
          'Content-Type': 'application/json'
        }
    })
    const minMaxData= await response.json()
    return minMaxData
  }

  const resourceUrl = `${PUBLIC_API_ENDPOINT}/products?order=desc&orderby=popularity`;
  const options = {
    method: 'GET',
    headers: {
        Nonce: '',
        'Content-Type': 'application/json'
    },
  }

  try {
    const res = await fetch(resourceUrl, options);
    const data = await res.json();
    const minMax = await getData()
    const { min_price, max_price } = minMax?.price_range 
    let min = Math.round(Number(priceFormat(min_price))-1)
    let max = Math.round(Number(priceFormat(max_price))+1)
    filterMinMax.set([min, max, 0, 100])

    if (res.ok) {
      return { status: 200, products: data, filters: {
        price: {
          min: min,
          max: max
        }
      } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: 'Something went wrong' } };
  }
}