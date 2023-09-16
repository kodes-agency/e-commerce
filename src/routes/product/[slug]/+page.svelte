<script lang="ts">
  import ProductGrid from "$lib/components/product/productGallery/ProductGrid.svelte";
  import ProductView from "$lib/components/product/singleProduct/ProductView.svelte";
  import ProductViewMobile from "$lib/components/product/singleProduct/ProductViewMobile.svelte";

  export let data;
</script>

<section class="p-5 py-20 md:p-10 md:pt-32 lg:px-[10vw] lg:py-[20vh]">
  <ProductView product={data.product} variations={data.variations} />
  <ProductViewMobile product={data.product} variations={data.variations} />
  <div
    class="w-full flex flex-col items-center justify-center space-y-16 pt-20"
  >
    <h2 class="text-4xl font-bold">Продукти на фокус</h2>
    <ProductGrid products={data.products} />
    <a
      class="uppercase text-center border border-[var(--black-color)] py-2 px-10 hover:bg-[var(--yellow-color)]"
      href="/product?order=desc&orderby=popularity">Всички продукти</a
    >
  </div>
</section>
