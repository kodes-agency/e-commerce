/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ fetch, cookies }) => {
    const response: any = await fetch("https://shop.fragment.bg/wp-json/wc/store/v1/cart", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
   
    cookies.set('nonce', response.headers.get('nonce'), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    })
}