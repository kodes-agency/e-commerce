<script lang="ts">
  import ProductVariations from "$lib/components/product/global/ProductVariations.svelte";
  import Img from "$lib/components/product/productGallery/elements/Img.svelte";
  import Name from "$lib/components/product/productGallery/elements/Name.svelte";
  import Price from "$lib/components/product/productGallery/elements/Price.svelte";
  import Added from "$lib/components/product/productGallery/elements/Added.svelte";
  import Description from "$lib/components/product/productGallery/elements/Description.svelte";
  import Button from "$lib/components/global/Button.svelte";
  import { toastStore } from "@skeletonlabs/skeleton";
  import { addItem } from "$lib/functions/cart/item/addCartItem.js";
  import type { Order } from "$lib/types/types.js";

  export let name: string;
  export let price: number;
  export let src: string;
  export let alt: string;
  export let variations: any;
  export let attributes: any;
  export let shortDescription: string;
  export let sizes: string;
  export let currency: string;
  export let id: number;
  export let quantity = 1;

  let ordered = false;
  let variationChange: boolean;
  let order: Order = {
    id: id,
    name: name,
    quantity: quantity,
  };
</script>

<article class="flex flex-col justify-between border border-black p-5">
  <div>
    <Img {src} {alt} {sizes} style="" />
    <div class="flex gap-5 justify-between">
      <Name {name} style="" />
      <Price {price} {currency} style="" />
    </div>
    <Description {shortDescription} style="" />
    <ProductVariations
      {attributes}
      {variations}
      on:variationChange={(event) => {
        order.id = event.detail.id;
        variationChange = event.detail.change;
      }}
      style="flex"
    />
  </div>

  {#if !ordered}
    <div class="flex flex-col justify-between gap-2">
      <Button
        {variationChange}
        {attributes}
        on:order={async (event) => {
          await addItem(order, toastStore);
          ordered = event.detail.ordered;
        }}
        text="Add to cart"
        type="add-to-cart-button"
      />
      <Button href={"/product/" + id} text="View product" type="link" />
    </div>
  {:else}
    <Added text="The product was added to your card" />
  {/if}
</article>
