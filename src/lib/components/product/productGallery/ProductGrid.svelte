<script lang="ts">
    import GridItem from "./GridItem.svelte";
    export let products: any;
</script>

<div>
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

<style>
    div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 20px;
        justify-content: center;
    }


</style>