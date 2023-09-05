<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { cartStore } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import PaymentMethod from "$lib/components/forms/PaymentMethod.svelte";
  import InvoiceShipping from "$lib/components/forms/InvoiceShipping.svelte";
  import ShippingDetails from "$lib/components/forms/ShippingDetails.svelte";
  import InvoiceDetails from "$lib/components/forms/InvoiceDetails.svelte";
  import OrderSummary from "$lib/components/forms/OrderSummary.svelte";
  import EmptyCart from "$lib/components/checkout/EmptyCart.svelte";
  import RequiredFileds from "$lib/components/forms/RequiredFileds.svelte";
  $cartStore = getCart();

  // onMount(async () => {
  //   console.log(await $cartStore);
  //   console.log($page);
  // });

  let chosenPayment: any;
  let shippingAddress: string;
  let companyInvoice: string;
</script>

<section class="flex flex-col-reverse md:flex-col py-10 pb-32 md:pb-0">
  {#await $cartStore}
    ...loading
  {:then cart}
    {#if cart.items.length > 0}
      <!-- FORM FIELDS -->
        <form
          name="checkout-form"
          method="POST"
          use:enhance
          class="flex-col w-full md:w-3/5 space-y-2 md:space-y-4 p-4 md:p-10"
        >
          <RequiredFileds />

          <InvoiceShipping bind:shippingAddress bind:companyInvoice />

          {#if shippingAddress} <ShippingDetails /> {/if}

          {#if companyInvoice} <InvoiceDetails /> {/if}

          <PaymentMethod bind:chosenPaymentMethod={chosenPayment} />
        </form>
      <!-- ORDER SUMMARY -->
      <OrderSummary {cart} chosenPaymentMethod={chosenPayment} />
    {:else}
      <EmptyCart />
    {/if}
  {/await}
</section>
