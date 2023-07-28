import type { Order } from "$lib/types/types";
import { cartStore } from "$lib/store/store";

export async function addItem(
  order: Order,
  store: { trigger: (arg0: { message: string; background: string }) => void }
) {
  try {
    const res = await fetch("/api/cart/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
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
        message: `${order.name} added to cart`,
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
