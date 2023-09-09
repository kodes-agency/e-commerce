<script lang="ts">
  import ProductVariations from "../global/ProductVariations.svelte";
  import Img from "./elements/Img.svelte";
  import Name from "./elements/Name.svelte";
  import Price from "./elements/Price.svelte";
  import Added from "./elements/Added.svelte";
  import Description from "./elements/Description.svelte";
  import Button from "../../global/Button.svelte";
  import { toastStore } from "@skeletonlabs/skeleton";
  import { addItem } from "$lib/functions/cart/item/addCartItem.js";

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
  $: order = {
    id: id,
    name: name,
    quantity: quantity,
  };
</script>

<article class="flex flex-col justify-between border border-black p-5">
  <div>
    <div class="flex items-center justify-center">
      <Img {src} {alt} {sizes} style="w-[180px] h-[180px] m-5 object-contain mix-blend-multiply"/>
    </div>
    <div class="flex gap-5 justify-between">
      <Name {name} style="font-bold text-sm"/>
      <Price {price} {currency} style="whitespace-nowrap text-sm" />
    </div>
    <Description {shortDescription} style="text-sm" />
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
