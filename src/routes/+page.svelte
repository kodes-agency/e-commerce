<script lang="ts">
    import ProductGrid from "$lib/components/product/productGallery/ProductGrid.svelte";
    export let data: any;
    const { products } = data;
  </script>
  
  <ProductGrid {products} />
  