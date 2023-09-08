import { writable } from 'svelte/store'
import type { Writable } from "svelte/store";

export const cartStore: any = writable()
export const isCartOpen = writable(false)
export const paymentMethod = writable()
export const filterMinMax = writable([0, 9999999, 0, 100])
export const filterCategory = writable([]) 
export const filterSort: Writable<string> = writable("order=desc&orderby=popularity")
export const filterProductsString: Writable<string> = writable("")