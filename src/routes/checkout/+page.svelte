<script lang="ts">
  import { enhance } from "$app/forms";
  export let data;
  import { cartStore } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import { priceFormat } from "$lib/functions/global/priceFormat.js";
  import CartItem from "$lib/components/cart/modalCart/demoCartItem.svelte";
  import Coupon from "$lib/components/cart/dynamicCart/Coupon.svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  $cartStore = getCart();

  onMount(async()=>{
    console.log(await $cartStore)
  })
  
  let shippingAddress: any;
  let companyInvoice: any;
  let submitButton: any;
  let chosenPayment: any;
</script>

<h1>Checkout</h1>
<section>
  {#await $cartStore}
    ...loading
  {:then cart}
    {#if cart.items.length > 0}
      <form method="POST" use:enhance class="flex flex-col-reverse mb-20 md:mb-0">
        <!-- FORM FIELDS -->
        <div
          id="form"
          class="flex-col w-full md:w-3/5 space-y-2 md:space-y-4 p-4 md:p-10"
        >
          <h2 class="text-lg font-medium text-gray-900">Billing details</h2>
          <div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
            <div class="flex flex-col w-full">
              <label class="whitespace-nowrap" for="billing_first_name"
                >First name:</label
              >
              <input
                type="text"
                class="form-input bg-transparent px-3 min-w-0 w-full"
                name="billing_first_name"
                id="billing_first_name"
                value={data.form.billing_address.first_name}
                required
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="whitespace-nowrap" for="billing_last_name"
                >Last name:</label
              >
              <input
                type="text"
                class="form-input bg-transparent px-3 w-full"
                name="billing_last_name"
                id="billing_last_name"
                value={data.form.billing_address.last_name}
                required
              />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
            <div class="flex flex-col w-full">
              <label class="" for="billing_email">Email:</label>
              <input
                type="email"
                class="form-input bg-transparent px-3 w-full"
                name="billing_email"
                id="billing_email"
                value={data.form.billing_address.email}
                required
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="" for="billing_phone">Phone:</label>
              <input
                type="tel"
                class="form-input bg-transparent px-3 w-full"
                name="billing_phone"
                id="billing_phone"
                value={data.form.billing_address.phone}
                required
              />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
            <div class="flex flex-col w-full">
              <label class="" for="billing_city">City:</label>
              <input
                type="text"
                class="form-input bg-transparent px-3 w-full"
                name="billing_city"
                id="billing_city"
                value={data.form.billing_address.city}
                required
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="" for="billing_postcode">Post code:</label>
              <input
                type="text"
                class="form-input bg-transparent px-3 w-full"
                name="billing_postcode"
                id="billing_postcode"
                value={data.form.billing_address.postcode}
                required
              />
            </div>
          </div>
          <div class="flex flex-col w-full">
            <label class="" for="billing_address_1">Address:</label>
            <input
              type="text"
              class="form-input bg-transparent px-3 w-full"
              name="billing_address_1"
              id="billing_address_1"
              value={data.form.billing_address.address_1}
              required
            />
          </div>

          <!-- Buttons for additional information -->
          <div
            class="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-10 z-10"
          >
            <label
              class="group relative flex items-center justify-center rounded-md border h-20 py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
              for="shipping_address"
            >
              <input
                type="checkbox"
                id="shipping_address"
                bind:checked={shippingAddress}
                name="shipping_address"
                class="sr-only peer"
              />
              <span
                class="flex justify-center items-center pointer-events-none absolute -inset-px rounded-md text-center border-4 peer-checked:border-blue-500 peer-disabled:border-gray-300 peer-checked:bg-blue-100"
                >Different shipping address?</span
              >
            </label>

            <label
              class="group relative flex items-center justify-center rounded-md border h-20 py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
              for="company_invoice"
            >
              <input
                type="checkbox"
                id="company_invoice"
                bind:checked={companyInvoice}
                name="company_invoice"
                class="sr-only peer"
              />
              <span
                class="flex justify-center items-center pointer-events-none absolute -inset-px text-center rounded-md border-4 peer-checked:border-blue-500 peer-disabled:border-gray-300 peer-checked:bg-blue-100"
                >Require company invoice?</span
              >
            </label>
          </div>

          <!-- Shipping details -->
          {#if shippingAddress}
            <fieldset transition:slide>
              <h2 class="text-lg font-medium text-gray-900 my-4">
                Shipping details
              </h2>
              <div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
                <div class="flex flex-col w-full">
                  <label class="whitespace-nowrap" for="shipping_first_name"
                    >First name:</label
                  >
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="shipping_first_name"
                    id="shipping_first_name"
                    required
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label class="whitespace-nowrap" for="shipping_last_name"
                    >Last name:</label
                  >
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="shipping_last_name"
                    id="shipping_last_name"
                    required
                  />
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
                <div class="flex flex-col w-full">
                  <label class="" for="shipping_email">Email:</label>
                  <input
                    type="email"
                    class="form-input bg-transparent px-3 w-full"
                    name="shipping_email"
                    id="shipping_email"
                    required
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label class="" for="shipping_phone">Phone:</label>
                  <input
                    type="tel"
                    class="form-input bg-transparent px-3 w-full"
                    name="shipping_phone"
                    id="shipping_phone"
                    required
                  />
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
                <div class="flex flex-col w-full">
                  <label class="" for="shipping_city">City:</label>
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="shipping_city"
                    id="shipping_city"
                    required
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label class="whitespace-nowrap" for="shipping_postcode"
                    >Post code:</label
                  >
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="shipping_postcode"
                    id="shipping_postcode"
                    required
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <label class="" for="shipping_address_1">Address:</label>
                <input
                  type="text"
                  class="form-input bg-transparent px-3 w-full"
                  name="shipping_address_1"
                  id="shipping_address_1"
                  required
                />
              </div>
            </fieldset>
          {/if}
          <!-- Company Invoice Details -->
          {#if companyInvoice}
            <fieldset transition:slide>
              <h2 class="text-lg font-medium text-gray-900 my-4">
                Invoice details
              </h2>
              <div
                class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-10 items-center"
              >
                <div class="flex flex-col w-full">
                  <label class="" for="company_name">Company name:</label>
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="company_name"
                    id="company_name"
                    required
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label class="whitespace-nowrap" for="company_tax_number"
                    >Tax number (VAT)</label
                  >
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="company_tax_number"
                    id="company_tax_number"
                    required
                  />
                </div>
              </div>
              <div
                class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-10 items-center"
              >
                <div class="flex flex-col w-full">
                  <label class="" for="company-country">Country:</label>
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="company_country"
                    id="company_country"
                    required
                  />
                </div>
                <div class="flex flex-col w-full">
                  <label class="" for="company_city">City:</label>
                  <input
                    type="text"
                    class="form-input bg-transparent px-3 w-full"
                    name="company_city"
                    id="company_city"
                    required
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <label class="" for="company_address">Company address:</label>
                <input
                  type="text"
                  class="form-input bg-transparent px-3 w-full"
                  name="company_address"
                  id="company_address"
                  required
                />
              </div>
            </fieldset>
          {/if}
          <!-- PAYMENT METHODS -->
          <section class="space-y-4">
            <h2 class="text-lg font-medium text-gray-900 my-4">
              Available payment methods
            </h2>

            <fieldset
              class="flex flex-col md:flex-row justify-around space-y-2 md:space-y-0 md:space-x-10"
            >
              {#each data.paymentMethods as paymentMethod}
                <label
                  class="group relative flex items-center justify-center rounded-md border h-20 py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
                  aria-disabled={!paymentMethod.available}
                  for="paymentMethod-{paymentMethod.id}"
                >
                  <input
                    type="radio"
                    id="paymentMethod-{paymentMethod.id}"
                    bind:group={chosenPayment}
                    name="payment_method"
                    value={paymentMethod.id}
                    class="sr-only peer"
                    aria-labelledby="size-choice-1-label"
                    disabled={!paymentMethod.available}
                  />
                  <span
                    class="flex justify-center items-center text-center pointer-events-none absolute -inset-px rounded-md border-4 peer-checked:border-blue-500 peer-disabled:bg-gray-300 peer-checked:bg-blue-100 peer-disabled:text-gray-500"
                    aria-hidden="true"
                  >
                    {paymentMethod.title}
                  </span>
                </label>
              {/each}
            </fieldset>
          </section>
        </div>

        <!-- ORDER SUMMARY -->
        <div
          id="cart"
          class="w-full md:w-2/5 md:fixed top-0 right-0 z-1 @container"
        >
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
                  <div
                    class="flex justify-between text-sm @sm:text-base text-gray-900"
                  >
                    <p>Subtotal</p>
                    <p>
                      {priceFormat(cart.totals.total_items)}{cart.totals
                        .currency_code}
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
                  <div
                    class="flex justify-between text-sm @sm:text-base text-gray-900"
                  >
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
                      {priceFormat(cart.totals.total_price)}{cart.totals
                        .currency_code}
                    </p>
                  </div>
                  <div class="mt-4">
                    <button
                      disabled={!chosenPayment}
                      type="submit"
                      class="hidden md:flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 mb-10 md:mb-0 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                      >Proceed with order</button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 fixed bottom-0 bg-white w-full md:hidden">
          <button
            disabled={!chosenPayment}
            type="submit"
            class="flex z-10 items-center justify-center rounded-md p-3 border border-transparent bg-indigo-600 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
            >Proceed with order</button
          >
        </div>
      </form>
    {:else}
      <div
        class="h-screen w-full flex items-center font-medium text-lg justify-center"
      >
        <p>
          Hey there, it seems that you have nothing added to your cart, yet.
        </p>
      </div>
    {/if}
  {/await}
</section>
