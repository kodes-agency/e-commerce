<script lang="ts">
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  export let price: number;
  export let currency: string;
  export let style: string;
</script>

<p class={style}>{priceFormat(price)}{currency}</p>

<style>
  p {
    font-size: 14px;
    white-space: nowrap;
  }
</style>
