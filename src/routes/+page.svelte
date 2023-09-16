<script lang="ts">
  import { PUBLIC_STRAPI_IMAGE } from "$env/static/public";
  import Category from "$lib/components/product/category/Category.svelte";
  import ProductGrid from "$lib/components/product/featuredGellery/ProductGrid.svelte";
  import { logoColor } from "$lib/store/store.js";
  import { onMount } from "svelte";
  export let data;

  let heroHeight: number;

  function scrollHandler() {
    if (window.scrollY + 25 >= heroHeight) {
      $logoColor = "var(--black-color)";
    } else {
      $logoColor = "var(--white-color)";
    }
  }

  onMount(() => {
    $logoColor = "var(--white-color)"
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      $logoColor = "var(--black-color)"
    };
  });
</script>

<div bind:clientHeight={heroHeight}>
  <img
    loading="lazy"
    class="w-full md:h-[80vh] object-cover"
    src={PUBLIC_STRAPI_IMAGE +
      data.page.data.attributes.pageThumbnail.data.attributes.url}
    alt=""
  />
</div>
<section
  class="bg-[var(--white-color)] min-h-screen pt-10 md:pt-20 w-full flex flex-col items-center space-y-10 md:space-y-20 relative z-10"
>
  <h1 class="text-4xl md:text-6xl font-bold w-full text-center px-5">
    {data.page.data.attributes.pageHeading}
  </h1>
  <ProductGrid products={data.products} />
  <a
    class="uppercase text-center border border-[var(--black-color)] py-2 px-10 hover:bg-[var(--yellow-color)]"
    href="/product?order=desc&orderby=popularity">Всички продукти</a
  >
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    {#each data.categories as category}
      {#if category.name != "Uncategorized"}
        <Category
          id={category?.id}
          name={category?.name}
          src={category?.image?.src}
          alt={category?.image?.alt}
        />
      {/if}
    {/each}
  </div>
</section>
