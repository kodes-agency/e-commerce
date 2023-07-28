import { cartStore } from "$lib/store/store";
export async function addCoupon(code: string, store: { trigger: (arg0: { message: any; background: string; }) => void; }): Promise<{ error: any; } | undefined>{
    try{
        const res = await fetch('/api/cart/coupons/add-coupon', {
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
                message: `Coupon ${code} activated`,
                background: "variant-filled-primary"})
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