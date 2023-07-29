<script lang="ts">
  import GridItem from "./GridItem.svelte";
  export let products: any;
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 p-5 sm:p-10 sm:gap-10 lg:p-20 lg:gap-10">
  {#each products as product}
    <GridItem
      name={product.name}
      id={product.id}
      price={product.prices.price}
      currency={product.prices.currency_suffix}
      src={product.images[0].src}
      sizes={product.images[0].sizes}
      alt={product.images[0].alt}
      variations={product.variations}
      attributes={product.attributes}
      shortDescription={product.short_description}
    />
  {/each}
</div>
