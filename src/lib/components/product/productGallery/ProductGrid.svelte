<script lang="ts">
    import GridItem from "./GridItem.svelte";
    export let products: any;
</script>

<div class="">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Featured products</h2>
  
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
    </div>
  </div>