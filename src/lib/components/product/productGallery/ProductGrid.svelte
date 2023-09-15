<script lang="ts">
  import GridItem from "./GridItem.svelte";
  export let products: any;
</script>

<div
  class="mt-6 grid grid-cols-2 p-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 w-full"
>
  {#each products as product}
    <GridItem
      name={product.name}
      slug={product.slug}
      price={product.prices.regular_price}
      currency={product.prices.currency_suffix}
      src={product.images[0].src}
      alt={product.images[0].alt}
      onSale={product.on_sale}
      salePrice={product.prices.sale_price}
    />
  {/each}
</div>
