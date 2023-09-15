<script lang="ts">
  import { extractDigits } from "$lib/functions/global/priceFormat.js";
  export let price: number;
  export let currency: string;
  export let style: string;
  export let salePrice: number
</script>

<div class="flex md:flex-col items-end space-x-2 md:space-x-0">
  <div class="flex space-x-1 w-fit relative">
    {#if salePrice !== price }
    <div class="h-0.5 w-full absolute top-2.5 bg-black rotate-12 right-0"></div>
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
    bottom: 4px;
    left: 1px;
  }
</style>