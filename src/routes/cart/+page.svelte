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

<section>
  <h1>Cart</h1>
  {#await $cartStore}
    <p>Loading ...</p>
  {:then cart}
    <div>
      {#if cart.items.length === 0}
        <p>Cart is empty</p>
      {:else if cart.items}
        <CartGrid {cart} />
        <div in:slide>
          <Line height="2px" margin="40px 0px 30px 0px" />
            <Coupon {cart} />
            <Totals {cart} currency={cart.totals.currency_suffix} />
        </div>
      {/if}
    </div>
  {/await}
</section>

<style>
  section {
    margin-top: 50px;
  }
</style>
