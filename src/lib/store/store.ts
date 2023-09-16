import { writable } from 'svelte/store'
import type { Writable } from "svelte/store";

export const products: any = writable()
export const cartStore: any = writable()
export const isCartOpen = writable(false)
export const paymentMethod = writable()
export const filterMinMax = writable([0, 9999999, 0, 100])
export const filterCategory = writable() 
export const filterSort: Writable<string> = writable("order=desc&orderby=popularity")
export const filterProductsString: Writable<string> = writable("")
export const filterHeading = writable()
export const logoColor = writable("var(--black-color)")
export const heroHeight:Writable<number> = writable()
export const subscribe = writable(false);
export const checkoutEnabled= writable(false)
