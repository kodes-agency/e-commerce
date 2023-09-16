<script lang="ts">
  import { enhance } from "$app/forms";
  import { cartStore } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import PaymentMethod from "$lib/components/checkout/forms/PaymentMethod.svelte";
  import InvoiceShipping from "$lib/components/checkout/forms/InvoiceShipping.svelte";
  import InvoiceDetails from "$lib/components/checkout/forms/InvoiceDetails.svelte";
  import OrderSummary from "$lib/components/checkout/forms/OrderSummary.svelte";
  import EmptyCart from "$lib/components/checkout/EmptyCart.svelte";
  import DeliveryForm from "$lib/components/checkout/forms/DeliveryForm.svelte";
  import { onMount } from "svelte";

  let chosenPayment: any;
  let companyInvoice: string;

  $cartStore = getCart();
</script>

<section class="flex flex-col-reverse md:flex-col pb-32 md:pb-0">
  {#await $cartStore}
    ...loading
  {:then cart}
    {#if cart.items.length > 0}
      <!-- FORM FIELDS -->
        <form
          name="checkout-form"
          method="POST"
          use:enhance
          class="flex-col w-full md:w-2/4 lg:w-3/5 space-y-2 md:space-y-4 p-4 md:p-5 lg:p-14 lg:py-32 md:py-24"
        >
          <DeliveryForm chosenPaymentMethod={chosenPayment}/>
          <PaymentMethod bind:chosenPaymentMethod={chosenPayment} />
    
          <InvoiceShipping bind:companyInvoice />
          {#if companyInvoice} <InvoiceDetails /> {/if}
        </form>
      <!-- ORDER SUMMARY -->
      <OrderSummary {cart} chosenPaymentMethod={chosenPayment} />
    {:else}
      <EmptyCart />
    {/if}
  {/await}
</section>
