import { writable } from 'svelte/store'
export const cartStore: any = writable()
export const isCartOpen = writable(false)
export const paymentMethod = writable()