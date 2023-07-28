<script lang="ts">
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  export let total: number;
  export let currency: string;
  export let style: string;
</script>

<p class={style}>{priceFormat(total)}{currency}</p>
