<script lang="ts">
  import Quantity from "$lib/components/cart/elements/Quantity.svelte";
  import RemoveButton from "$lib/components/cart/elements/RemoveButton.svelte";
  import Name from "$lib/components/cart/elements/Name.svelte";
  import Price from "$lib/components/cart/elements/Price.svelte";
  import Variation from "$lib/components/cart/elements/Variation.svelte";
  import Img from "$lib/components/cart/elements/Img.svelte";
  import { updateItem, deleteItem } from "$lib/functions/cart/cartFunctions.js";
  import { toastStore } from "@skeletonlabs/skeleton";

  export let item: any;

  $: cartItem = {
    key: item.key,
    id: item.id,
    name: item.name,
    quantity: item.quantity,
  };
</script>

<section class="flex flex-wrap justify-between items-center p-2 px-6 mb-5">
  <div class="flex items-center gap-10 w-2/5">
    <Img
      src={item.images[0].src}
      alt={item.images[0].alt}
      width="60px"
      height="60px"
      style="m-2 border border-black"
    />
    <Name name={item.name} style="" />
  </div>

  <Variation variation={item?.variation[0]?.value} style="font-bold"/>

  <div class="flex flex-row items-center gap-4">
    <Quantity
      currentQuantity={item.quantity}
      min={item.quantity_limits.minimum}
      max={item.quantity_limits.maximum}
      on:quantityChange={async (event) => {
        cartItem.quantity = event.detail.quantity;
        await updateItem(cartItem, toastStore);
      }}
    />
    <Price
      total={item.totals.line_subtotal}
      currency={item.prices.currency_suffix}
      style="whitespace-nowrap border border-black w-36 h-10 flex items-center justify-center"
    />
    <RemoveButton
      style="hover:bg-amber-300 p-2 rounded-full"
      on:click={async () => {
        await deleteItem(cartItem, toastStore);
      }}
    />
  </div>
</section>
