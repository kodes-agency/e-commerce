<script lang="ts">
  import { goto } from "$app/navigation";
  import { loadStripe } from "@stripe/stripe-js";
  import { Elements, CardNumber, CardCvc, CardExpiry } from "svelte-stripe";
  import { onMount } from "svelte";
  import { PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { page } from "$app/stores";

  let stripe: any = null;
  let error: any = null;
  let cardElement: any;
  let name: any
  let processing = false;

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
    console.log(result.paymentIntent.id)


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

<div class="p-10 w-full">
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
          placeholder="Your name"
          disabled={processing}
          class="p-1 rounded"
        />
        <CardNumber
          bind:element={cardElement}
          classes={{ base: "input rounded bg-white p-2" }}
        />

        <div class="flex space-x-2">
          <CardExpiry classes={{ base: "input rounded bg-white p-2" }} />
          <CardCvc classes={{ base: "input rounded bg-white p-2" }} />
        </div>

        <button
          disabled={processing}
          class="p-1 px-10 border border-zinc-950 hover:bg-zinc-950 hover:text-white"
        >
          {#if processing}
            Processing...
          {:else}
            Pay
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
