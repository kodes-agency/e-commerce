<script lang="ts">
  import Img from "./elements/Img.svelte";
  import Name from "./elements/Name.svelte";
  import Price from "./elements/Price.svelte";
  import Quantity from "./elements/Quantity.svelte";
  import Variation from "./elements/Variation.svelte";
  import { updateItem, deleteItem } from "$lib/functions/cart/cartFunctions.js";
  import RemoveButton from "./elements/RemoveButton.svelte";
  import { slide } from "svelte/transition"; 

  export let item: any;

  $: cartItem = {
    key: item.key,
    id: item.id,
    name: item.name,
    quantity: item.quantity,
  };
</script>

<li class="hidden sm:flex py-4 sm:py-6" transition:slide>
  <a href={"/product/"+item.name.replaceAll('&#8211; ', '').replaceAll(' ', '-').toLowerCase().slice(0,40)} data-sveltekit-reload>
    <div
      class="flex items-center justify-center h-16 w-16 sm:h-24 sm:w-24 flex-shrink-1 overflow-hidden border border-gray-200"
    >
      <Img src={item.images[0].src} alt={item.images[0].alt} />
    </div>
  </a>
  
  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div
        class="flex justify-between space-x-1 text-base font-medium text-gray-900"
      >
      <a href={"/product/"+item.name.replaceAll('&#8211; ', '').replaceAll(' ', '-').toLowerCase().slice(0,40)} data-sveltekit-reload>
        <Name name={item.name} style="text-sm lg:text-base font-bold" />
      </a>
        <Price
          total={item.totals.line_total}
          currency={item.totals.currency_suffix}
          style="whitespace-nowrap text-sm lg:text-base"
        />
      </div>
      {#if item?.variation.length > 0 }     
        <Variation
          variation={item?.variation[0]?.value}
          style="mt-1 text-xs text-gray-500"
        />
      {/if}
    </div>
    <div class="flex flex-1 items-end justify-between">
      <Quantity
        currentQuantity={item.quantity}
        min={item.quantity_limits.minimum}
        max={item.quantity_limits.maximum}
        on:quantityChange={async (event) => {
          cartItem.quantity = event.detail.quantity;
          await updateItem(cartItem);
        }}
      />

      <div class="flex">
        <RemoveButton
          style="font-medium text-sm lg:text-base text-[var(--magenta-color)] hover:text-[var(--black-color)]"
          on:click={async () => {
            await deleteItem(cartItem);
          }}
        >
          Премахни
        </RemoveButton>
      </div>
    </div>
  </div>
</li>

<li class="flex sm:hidden py-4" transition:slide>
  <Img style="h-28 w-28 aspect-square object-contain border border-gray-200" src={item.images[0].src} alt={item.images[0].alt} />
  <div
    class="flex flex-col justify-between items-stretch w-full text-base font-medium text-gray-900 px-3"
  >
    <div>
        <Name name={item.name} style="text-sm font-bold"/>
        {#if item?.variation.length > 0 }        
          <Variation
            variation={"Размер: "+item?.variation[0]?.value}
            style="text-sm  text-gray-600"
          />
        {/if}
      <Price
        total={item.totals.line_total}
        currency={item.totals.currency_suffix}
        style="whitespace-nowrap text-sm"
      />
    </div>
    <div class=" flex flex-col">
      <div class="flex  items-end justify-between">
        <Quantity
          currentQuantity={item.quantity}
          min={item.quantity_limits.minimum}
          max={item.quantity_limits.maximum}
          on:quantityChange={async (event) => {
            cartItem.quantity = event.detail.quantity;
            await updateItem(cartItem);
          }}
        />
  
          <RemoveButton
            style="font-medium text-sm lg:text-base bg-[var(--yellow-color)] h-6 w-6 rounded-full flex items-center justify-center hover:bg-[var(--black-color)] text-[var(--black-color)] hover:text-[var(--white-color)]"
            on:click={async () => {
              await deleteItem(cartItem);
            }}
          >
            X
          </RemoveButton>
      </div>
    </div>
  </div>
</li>
