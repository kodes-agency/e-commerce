import type { CartItem } from "$lib/types/types";
import { cartStore } from "$lib/store/store";

export async function updateItem(
  item: CartItem,
  store: { trigger: (arg0: { message: any; background: string }) => void }
) {
  try {
    const res = await fetch("/api/cart/update-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: item.key,
        quantity: Number(item.quantity),
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
        message: `${item.name} quantity updated`,
        background: "variant-filled-primary",
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
