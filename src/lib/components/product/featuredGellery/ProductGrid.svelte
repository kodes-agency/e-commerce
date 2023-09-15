<script lang="ts">
  import GridItem from "./GridItem.svelte";
  export let products: any;
</script>

  <div
    class="mt-6 grid p-6 md:p-0 grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:gap-x-8 max-w-4xl"
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
