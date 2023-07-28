<script lang="ts">
  import Quantity from "$lib/components/cart/elements/Quantity.svelte";
  import RemoveButton from "$lib/components/cart/elements/RemoveButton.svelte";
  import Name from "$lib/components/cart/elements/Name.svelte";
  import Price from "$lib/components/cart/elements/Price.svelte";
  import Variation from "$lib/components/cart/elements/Variation.svelte";
  import Img from "$lib/components/cart/elements/Img.svelte";
  import {
    updateItem,
    deleteItem,
    getCart,
  } from "$lib/functions/cart/cartFunctions.js";
  import { cartStore } from "$lib/store/store.js";
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { CartItem } from "$lib/types/types.js";

  export let item: any;

  let cartItem: CartItem = {
    key: item.key,
    id: item.id,
    name: item.name,
    quantity: item.quantity,
  };
</script>

<section class="cart-item-wrapper">
  <Img
    src={item.images[0].src}
    alt={item.images[0].alt}
    width="50px"
    height="50px"
    style=""
  />
  <Name name={item.name} style="" />

  <Variation variation={item?.variation[0]?.value} />
  <Quantity
    currentQuantity={item.quantity}
    min={item.quantity_limits.minimum}
    max={item.quantity_limits.maximum}
    on:quantityChange={async (event) => {
      cartItem.quantity = event.detail.quantity;
      await updateItem(cartItem, toastStore);
    }}
  />
  <Price
    total={item.totals.line_subtotal}
    currency={item.prices.currency_suffix}
    style=""
  />
  <RemoveButton
    on:click={async () => {
      await deleteItem(cartItem, toastStore);
    }}
  />
</section>

<style>
  .cart-item-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-block: 10px;
    transition: all 0.5s;
    padding: 10px;
  }

  .cart-item-wrapper:hover {
    background-color: var(--hover-color-light);
  }
</style>
