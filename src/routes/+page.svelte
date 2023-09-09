<script lang="ts">
  import FilterWrapper from "$lib/components/filters/FilterWrapper.svelte";
  import ProductGrid from "$lib/components/product/productGallery/ProductGrid.svelte";
  import { products, filterProductsString } from "$lib/store/store";
  import { fade } from "svelte/transition";
  export let data

  async function getProducts(filterString:any) {
    const response = await fetch("/api/product/get-products", {
      method: "POST",
      body: JSON.stringify(filterString)
    });
    const json = await response.json();
    const { products } = json;
    console.log(products, json);
    return products;
  }

  $: $products = getProducts($filterProductsString)
</script>

<section class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
  <FilterWrapper />
  {#await $products}
  <div class=" blur-sm">
    <ProductGrid products={data.products} />
  </div>
  {:then products}
  <div in:fade>
    <ProductGrid {products}/>
  </div>
  {/await}
</section>

