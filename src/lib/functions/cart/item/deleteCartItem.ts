import type { CartItem } from "$lib/types/types";
import { cartStore } from "$lib/store/store";

export async function deleteItem(
  item: CartItem,
  store: { trigger: (arg0: { message: any; background: string }) => void }
) {
  try {
    const res = await fetch("/api/cart/remove-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: item.key,
      }),
    });
    const data = await res.json();
    if (data.error || data.message) {
      store.trigger({
        message: data.error || data.message,
        background: "variant-filled-error",
      });
    } else {
      cartStore.set(await data);
      store.trigger({
        message: `${item.name} removed from cart`,
        background: "variant-filled-warning",
      });
    }
    return;
  } catch (er: any) {
    store.trigger({
      message: er.message,
      background: "variant-filled-error",
    });
    return { error: er.message };
  }
}
