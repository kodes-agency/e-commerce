import type { Order } from "$lib/types/types";
import { cartStore } from "$lib/store/store";
import { toastStore } from "@skeletonlabs/skeleton";


export async function addItem(order: Order) {
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
      toastStore.trigger({
        message: data.error || data.message,
        background: "bg-[var(--magenta-color)]",
      });
    } else {
      cartStore.set(await data);

      toastStore.trigger({
        message: `Добавихме ${order.name} към вашата количка`,
        background: "bg-[var(--cyan-color)]",
        timeout: 2500,
      });
    }
    return;
  } catch (er: any) {
    toastStore.trigger({
      message: er.message,
      background: "bg-[var(--magenta-color)]",
    });
    return { error: er.message };
  }
}
