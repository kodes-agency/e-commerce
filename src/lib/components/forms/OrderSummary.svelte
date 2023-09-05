<script lang="ts">
  import CartItem from "$lib/components/cart/modalCart/demoCartItem.svelte";
  import Coupon from "$lib/components/cart/dynamicCart/Coupon.svelte";
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  import { modalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings } from "@skeletonlabs/skeleton";

  export let cart: any;
  export let chosenPaymentMethod: string;

  const modal: ModalSettings = {
    type: "component",
    component: "paymentModal",
  };
</script>

<div id="cart" class="w-full md:w-2/5 md:fixed top-0 right-0 z-1 @container">
  <div class="flex flex-col w-full p-2 @sm:p-5 lg:p-10 bg-white md:h-screen">
    <div class="pointer-events-auto w-sreen h-full">
      <div class="flex flex-col bg-white h-full">
        <div class="flex-1 md:overflow-y-auto px-4 py-6 sm:px-6">
          <div class="flex items-start justify-between">
            <h2
              class="text-lg font-medium text-gray-900 mt-4"
              id="slide-over-title"
            >
              Order summary
            </h2>
          </div>

          <div class="mt-5">
            <div class="flow-root">
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                {#each cart.items as item}
                  <CartItem {item} />
                {/each}
              </ul>
            </div>
          </div>
        </div>

        <Coupon {cart} />
        <div class="border-t border-gray-200 px-4 pt-2 sm:px-6">
          <div class="flex justify-between text-sm @sm:text-base text-gray-900">
            <p>Subtotal</p>
            <p>
              {priceFormat(cart.totals.total_items)}{cart.totals.currency_code}
            </p>
          </div>
          {#if cart.coupons.length > 0}
            <div
              class="flex justify-between text-sm @sm:text-base font-medium text-gray-900"
            >
              <p>Discount</p>
              <p>
                -{priceFormat(cart.totals.total_discount)}{cart.totals
                  .currency_code}
              </p>
            </div>
          {/if}
          <div class="flex justify-between text-sm @sm:text-base text-gray-900">
            <p>Shipping</p>
            {#if cart.totals.total_shipping == 0}
              <p class="font-medium">Free</p>
            {:else}
              <p>
                {priceFormat(cart.totals.total_shipping)}{cart.totals
                  .currency_code}
              </p>
            {/if}
          </div>
          <div
            class="flex justify-between text-sm @sm:text-base font-bold text-gray-900"
          >
            <p>Total price</p>
            <p>
              {priceFormat(cart.totals.total_price)}{cart.totals.currency_code}
            </p>
          </div>
          <div class="mt-4">
            <button
              disabled={!chosenPaymentMethod}
              type="button"
              class="hidden md:flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 mb-10 md:mb-0 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
              on:click={({ }) => {
                if (chosenPaymentMethod == "cod") {
                    // @ts-ignore
                    document.forms["checkout-form"].submit();
                } else if (chosenPaymentMethod == "alg_custom_gateway_1") {
                    modalStore.trigger(modal);
                }
              }}>Proceed with order</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="p-4 fixed bottom-0 bg-white w-full md:hidden">
  <button
    disabled={!chosenPaymentMethod}
    type="button"
    class="flex z-10 items-center justify-center rounded-md p-3 border border-transparent bg-indigo-600 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
    on:click={({ target }) => {
      if (chosenPaymentMethod == "cod") {
        // @ts-ignore
        document.forms["checkout-form"].submit();
      } else if (chosenPaymentMethod == "alg_custom_gateway_1") {
        modalStore.trigger(modal);
      }
    }}>Proceed with order</button
  >
</div>
