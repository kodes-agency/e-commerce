<script lang="ts">
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  export let regular_price: string,
    sale_price: string,
    currency_suffix: string,
    currency_prefix: string,
    currency_code: string,
    language: string;
</script>

{#if regular_price == sale_price}
  {#if language == "en"}
    <p>{priceFormat(sale_price)} {currency_code}</p>
  {:else}
    <p>{currency_prefix}{priceFormat(sale_price)}{currency_suffix}</p>
  {/if}
{:else if language == "en"}
  <div class="price-wrapper">
    <p class="regular">{priceFormat(regular_price)} {currency_code}</p>
    <p class="sale">{priceFormat(sale_price)} {currency_code}</p>
  </div>
{:else}
  <div class="price-wrapper">
    <p class="regular">
      {currency_prefix}{priceFormat(regular_price)}{currency_suffix}
    </p>
    <p class="sale">
      {currency_prefix}{priceFormat(sale_price)}{currency_suffix}
    </p>
  </div>
{/if}

<style>
  p {
    font-size: 18px;
    text-align: end;
  }

  .regular {
    opacity: 0.5;
    text-decoration: line-through;
  }

  .price-wrapper {
    display: block;
  }
</style>
