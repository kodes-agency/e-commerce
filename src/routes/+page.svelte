<script lang="ts">
  import FilterWrapper from "$lib/components/filters/FilterWrapper.svelte";
    import ProductGrid from "$lib/components/product/productGallery/ProductGrid.svelte";
    export let data: any;
    const { products } = data;
  </script>
  <FilterWrapper />
  <ProductGrid {products} />
  