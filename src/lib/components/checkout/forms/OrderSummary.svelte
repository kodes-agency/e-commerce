<script lang="ts">
  import CartItem from "$lib/components/cart/CartItem.svelte";
  import Coupon from "$lib/components/cart/elements/Coupon.svelte";
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  import { modalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings } from "@skeletonlabs/skeleton";
  import { checkoutEnabled } from "$lib/store/store";

  export let cart: any;
  export let chosenPaymentMethod: string;

  const modal: ModalSettings = {
    type: "component",
    component: "paymentModal",
  };
</script>

<div id="cart" class="w-full md:w-2/4 lg:w-2/5 md:fixed top-0 right-0 z-1">
  <div class="flex flex-col w-full p-2 pt-16 md:pt-0 lg:p-10 bg-white md:h-screen">
    <div class="pointer-events-auto w-sreen h-full">
      <div class="flex flex-col bg-white h-full">
        <div class="flex-1 md:overflow-y-auto px-1 sm:px-4 py-6">
          <div class="flex items-start justify-between">
            <h2
              class="text-xl md:text-2xl font-medium text-gray-900 mb-4 md:mt-4"
              id="slide-over-title"
            >
              Вашата поръчка
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
        <div class="border-t border-gray-200 px-1 sm:px-4 pt-2">
          <div class="flex justify-between text-gray-900">
            <p class="text-sm md:text-base">Общо</p>
            <p class="text-sm md:text-base">
              {priceFormat(cart.totals.total_items)}{cart.totals.currency_suffix}
            </p>
          </div>
          {#if cart.coupons.length > 0}
            <div
              class="flex justify-between text-gray-900"
            >
              <p class="text-sm md:text-base">Отстъпка</p>
              <p class="text-sm md:text-base">
                -{priceFormat(cart.totals.total_discount)}{cart.totals
                  .currency_suffix}
              </p>
            </div>
          {/if}
          <div class="flex justify-between text-gray-900">
            <p class="text-sm md:text-base">Доставка</p>
            {#if cart.totals.total_shipping == 0}
              <p class="font-bold text-sm md:text-base">безплатна</p>
            {:else}
              <p>
                {priceFormat(cart.totals.total_shipping)}{cart.totals
                  .currency_suffix}
              </p>
            {/if}
          </div>
          <div
            class="flex justify-between font-bold text-gray-900"
          >
            <p class="text-sm md:text-base">Всичко</p>
            <p class="text-sm md:text-base">
              {priceFormat(cart.totals.total_price)}{cart.totals.currency_suffix}
            </p>
          </div>
          <div class="mt-4">
            <button
              disabled={!$checkoutEnabled}
              type="button"
              class="hidden md:flex items-center justify-center bg-indigo-600 px-6 py-3 mb-10 md:mb-0 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
              on:click={({ }) => {
                if (chosenPaymentMethod == "cod") {
                    // @ts-ignore
                    document.forms["checkout-form"].submit();
                } else if (chosenPaymentMethod == "alg_custom_gateway_1") {
                    modalStore.trigger(modal);
                }
              }}>Завършване на поръчка</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="p-4 fixed bottom-0 bg-white w-full md:hidden">
  <button
    disabled={!$checkoutEnabled}
    type="button"
    class="flex z-10 items-center justify-center p-3 bg-indigo-600 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
    on:click={({ target }) => {
      if (chosenPaymentMethod == "cod") {
        // @ts-ignore
        document.forms["checkout-form"].submit();
      } else if (chosenPaymentMethod == "alg_custom_gateway_1") {
        modalStore.trigger(modal);
      }
    }}>Завършване на поръчка</button
  >
</div>
