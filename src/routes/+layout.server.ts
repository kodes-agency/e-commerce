/** @type {import('@sveltejs/kit').Load} */

import { PUBLIC_API_ENDPOINT } from '$env/static/public';
export const load = async ({ fetch, cookies }) => {
    const response: any = await fetch("https://shop.fragment.bg/wp-json/wc/store/v1/cart", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    
    const responseCagtegories = await fetch(`${PUBLIC_API_ENDPOINT}/products/categories`);
    const productCategories = await responseCagtegories.json();
    
    cookies.set('nonce', response.headers.get('nonce'), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    })

    return {
        categories: productCategories
    }
}