<script lang="ts">
  import Totals from "$lib/components/cart/Totals.svelte";
  import CartGrid from "$lib/components/cart/CartGrid.svelte";
  import Coupon from "$lib/components/cart/Coupon.svelte";
  import { cartStore } from "$lib/store/store.js";
  import { getCart } from "$lib/functions/cart/cartFunctions.js";
  import Line from "$lib/components/global/Line.svelte";
  import { slide } from "svelte/transition";
  $cartStore = getCart();
</script>

<section class="m-16">
  <h1 class="text-2xl font-bold mb-10">Cart</h1>
  {#await $cartStore}
    <p>Loading ...</p>
  {:then cart}
    <div>
      {#if cart.items.length === 0}
        <p>Cart is empty</p>
      {:else if cart.items}
        <CartGrid {cart} />
        <Line/>
        <div in:slide class="flex flex-row justify-between">
            <Coupon {cart} />
            <Totals {cart} currency={cart.totals.currency_suffix} />
        </div>
      {/if}
    </div>
  {/await}
</section>

