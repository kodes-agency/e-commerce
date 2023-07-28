<script lang="ts">
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  import Line from "$lib/components/global/Line.svelte";
  import Button from "../global/Button.svelte";
  export let cart: any;
  export let heading = "Total";
  export let checkoutButton = "checkout";
  export let currency = "";
</script>

<div class="totals-wrapper">
  <p class="heading">{heading}</p>
  <div class="totals">
    <p class="bold">{priceFormat(cart.totals.total_items)}{currency}</p>
    {#if cart.coupons.length > 0}
      <p>-{priceFormat(cart.totals.total_discount)}{currency}</p>
    {/if}
    <Line margin="20px 0 10px 0" height="2px" />
    <p class="bold">{priceFormat(cart.totals.total_price)}{currency}</p>
    <Button href="/checkout" text={checkoutButton} type="link" />
  </div>
</div>

<style>
  .totals-wrapper {
    display: flex;
    flex-direction: row;
  }

  .heading {
    margin: 0 20px 0 0;
  }

  .totals {
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .bold {
    font-weight: bold;
  }
</style>
