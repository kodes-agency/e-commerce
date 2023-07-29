<script lang="ts">
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  import Line from "$lib/components/global/Line.svelte";
  import Button from "../global/Button.svelte";
  export let cart: any;
  export let heading = "Total";
  export let checkoutButton = "checkout";
  export let currency = "";
</script>

<div class="flex flex-row">
  <p class="mr-8">{heading}</p>
  <div class="flex flex-col items-end">
    <p class="font-bold">{priceFormat(cart.totals.total_items)}{currency}</p>
    {#if cart.coupons.length > 0}
      <p>-{priceFormat(cart.totals.total_discount)}{currency}</p>
    {/if}
    <Line style="w-full h-px bg-black my-2"/>
    <p class="font-bold mb-10">{priceFormat(cart.totals.total_price)}{currency}</p>
    <Button href="/checkout" text={checkoutButton} type="link" />
  </div>
</div>
