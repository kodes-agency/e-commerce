<script lang="ts">
  import { loadStripe } from "@stripe/stripe-js";
  import { Elements, CardNumber, CardCvc, CardExpiry } from "svelte-stripe";
  import { onMount } from "svelte";
  import { PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { cartStore } from "$lib/store/store";
  import { priceFormat } from "$lib/functions/global/priceFormat";
  import { SyncLoader } from 'svelte-loading-spinners'

  let stripe: any = null;
  let error: any = null;
  let cardElement: any;
  let name: any
  let processing = false;
  console.log($cartStore)

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY);
  });

  async function createPaymentIntent() {
    const response = await fetch("/api/payment", { 
      method: "POST"
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return;

    processing = true;

    // create the payment intent server-side
    const clientSecret = await createPaymentIntent();

    // confirm payment with stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name,
        },
      },
    });

    // log results, for debugging
    console.log(result)


    if (result.error) {
      // payment failed, notify user
      error = result.error;
      processing = false;
    } else {
      // @ts-ignore
      document.forms["checkout-form"].elements["payment_id"].value = result.paymentIntent.id
      // @ts-ignore
      document.forms["checkout-form"].submit()
    }
  }
</script>

<div class="p-0 w-full">
  {#if stripe}
    <Elements {stripe} variables={{ borderRadius: "0" }}>
      <form
        on:submit|preventDefault={submit}
        class="flex flex-col space-y-2"
      >
        {#if error}
          <p class="error text-center text-red-600 font-bold">
            {error.message} Please try again.
          </p>
        {/if}
        <input
          name="name"
          placeholder="Имена на картодържател"
          disabled={processing}
          class="form-input p-3 rounded-sm text-base"
        />
        <CardNumber
          bind:element={cardElement}
          placeholder="Номер на карта"
          classes={{ base: "input text-base rounded-sm bg-white p-3" }}
        />

        <div class="flex space-x-2">
          <CardExpiry 
            classes={{ base: "input text-base rounded-sm bg-white p-3" }}
            placeholder="ММ / ГГ"
          />
          <CardCvc classes={{ base: "input text-base rounded-sm bg-white p-3" }} />
        </div>

        <button
          disabled={processing}
          class="bg-indigo-600 flex items-center justify-center space-x-4 rounded-sm p-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full disabled:bg-indigo-700"
        >
          {#if processing}
          <p>Обработка</p>
          <SyncLoader size="35" color="white" unit="px" duration="1s"/> 
          {:else}
          Плащане 
          {/if}
        </button>
      </form>
    </Elements>
  {:else}
    Loading...
  {/if}
</div>

<style>
  :global(.rounded) {
    border-radius: 0px !important;
  }
</style>
