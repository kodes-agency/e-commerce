import { cartStore } from "$lib/store/store";

export async function deleteCoupon(code: number, store: { trigger: (arg0: { message: any; background: string; }) => void; }){
    try{
        const res = await fetch('/api/cart/coupons/delete-coupon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    code: code,
                }
            )
        })

        const data = await res.json()
        if (data.error || data.message) {
            store.trigger({
                message: data.error || data.message,
                background: "variant-filled-error"
            })
        } else {
            cartStore.set(await data)
            store.trigger({
                message: `Coupon ${code} removed`,
                background: "variant-filled-warning"})
        }
        return

    } catch(er: any){
        store.trigger({
            message: er.message,
            background: "variant-filled-error"
        })
        return {error: er.message}
    }
}