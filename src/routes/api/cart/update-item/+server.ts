import { json } from '@sveltejs/kit'
import { z } from 'zod';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import * as set_cookie_parser from 'set-cookie-parser';

export async function POST({request, cookies}){

    const cart = await request.json()
    //Validating the request data
      
    const cartItem = z.object({
        key: z.string().refine(value => value !== undefined, {
            message: 'id is required',
            path: ['id']
        }),
        quantity: z.number().refine(value => value !== undefined, {
            message: 'quantity is required',
            path: ['quantity']
        }),
    });
    
    function validateForm(formData: cartItem) {
        try {
            cartItem.parse(formData);
            return [];
        } catch (er: any) {
            return er.errors;
        }
    }

    type cartItem = z.infer<typeof cartItem>;
    
    const validationErrors = validateForm(cart);

    if (validationErrors.length > 0) {
        return json({ errors: validationErrors }, { status: 422 });
    }

    //Sending the request to the WP API

    const obj: any = { 'Content-Type': 'application/json'}

    cookies.getAll().forEach((cookie) => {
        obj[cookie.name] = cookie.value
    })

    const response: any = await fetch(`${PUBLIC_API_ENDPOINT}/cart/update-item`, {
        method: 'POST',
        headers: obj,
        body: JSON.stringify({
            "key": cart.key,
            "quantity": cart.quantity,
        })
    })

    const headerCookies = set_cookie_parser.parse(set_cookie_parser.splitCookiesString(response.headers.get('set-cookie')))

    headerCookies.forEach((cookie) => {
        cookies.set(cookie.name, cookie.value, {
            path: cookie.path,
            expires: cookie?.expires,
            maxAge: cookie?.maxAge,
            secure: cookie?.secure,
            httpOnly: cookie?.httpOnly
        })
    })

    cookies.set('cart-token', response.headers.get('cart-token'), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: false
    })

    const data = await response.json()

    return json( data )
}