<script lang="ts">
  import { onMount } from "svelte";
  import Img from "../productGallery/elements/Img.svelte";
  import Name from "../productGallery/elements/Name.svelte";
  import Price from "../productGallery/elements/Price.svelte";

  export let name: string;
  export let price: number;
  export let src: string;
  export let alt: string;
  export let currency: string;
  export let slug: string;
  export let onSale: boolean;
  export let salePrice: number
  
</script>

<a href="/product/{slug}" class="relative">
  {#if onSale}
    <div
      class="absolute -top-4 -left-4 flex justify-center items-center bg-[var(--magenta-color)] rounded-full w-14 h-14 md:w-16 md:h-16"
    >
      <p class="uppercase text-sm md:text-base font-bold text-[var(--white-color)]">Sale</p>
    </div>
  {/if}
  <article class="flex flex-col justify-between space-y-2">
    <div
      class="flex items-center justify-center border border-black aspect-square"
    >
      <Img {src} {alt} style="object-contain max-w-100px md:max-w-[200px] h-[200px] mix-blend-multiply" />
    </div>
    <div class="flex flex-col md:flex-row md:space-x-5 justify-between">
      <Name {name} style="font-bold text-sm" />
      <Price {salePrice} {price} {currency} style="whitespace-nowrap text-sm italic" />
    </div>
  </article>
</a>
