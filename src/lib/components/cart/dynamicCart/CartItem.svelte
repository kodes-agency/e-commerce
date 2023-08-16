<script lang="ts">
  import Quantity from "./elements/Quantity.svelte";
  import RemoveButton from "./elements/RemoveButton.svelte";
  import Name from "./elements/Name.svelte";
  import Price from "./elements/Price.svelte";
  import Variation from "./elements/Variation.svelte";
  import Img from "./elements/Img.svelte";
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

<section class="flex flex-col p-3 border border-zinc-900">
  <div class="flex">
    <Img
      src={item.images[0].src}
      alt={item.images[0].alt}
      style=" border border-black"
    />

    <div class="flex flex-col justify-stretch">
      <div class="flex">
        <div class="flex flex-col border border-zinc-500">
          <Name name={item.name} style="" />
          <Variation variation={item?.variation[0]?.value} />
          <div class="flex">
            <Quantity
            currentQuantity={item.quantity}
            min={item.quantity_limits.minimum}
            max={item.quantity_limits.maximum}
            on:quantityChange={async (event) => {
              cartItem.quantity = event.detail.quantity;
              await updateItem(cartItem, toastStore);
            }}
            />
          </div>
        </div>
        <Price
          total={item.totals.line_subtotal}
          currency={item.prices.currency_suffix}
          style="whitespace-nowrap border border-black w-36 h-10 flex items-center justify-center"
        />
      </div>


      <div class="flex justify-end">
        <RemoveButton
          style="hover:bg-amber-300 p-2 rounded-full"
          on:click={async () => {
            await deleteItem(cartItem, toastStore);
          }}
        />
    </div>
  </div>
</section>