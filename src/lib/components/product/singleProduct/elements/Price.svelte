<script lang="ts">
  import { extractDigits } from "$lib/functions/global/priceFormat.js";
  export let price: number;
  export let currency: string;
  export let style: string;
  export let salePrice: number
</script>

<div class="flex flex-col md:flex-row items-end md:items-start md:space-x-2 ">
  <div class="flex space-x-1 w-fit relative">
    {#if salePrice !== price }
    <div class="h-0.5 w-full absolute top-3.5 bg-black right-0"></div>
    <!-- <div class="h-px w-full absolute top-2.5 bg-black -rotate-12 right-0"></div> -->
    {/if}
    <p class="content {style}"  data-end="{extractDigits(price, "last")}">{extractDigits(price, "first")}</p><p class={style}>{currency}</p>
  </div>
  {#if salePrice !== price }
  <div class="flex space-x-1">
    <p class="content {style}"  data-end="{extractDigits(salePrice, "last")}">{extractDigits(salePrice, "first")}</p><p class={style}>{currency}</p>
  </div>
  {/if}
</div>

<style>
  .content::after {
    content: attr(data-end);
    font-size: 12px;
    position: relative;
    bottom: 7px;
    left: 1px;
  }
</style>