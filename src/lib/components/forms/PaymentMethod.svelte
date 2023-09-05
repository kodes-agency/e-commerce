<script lang="ts">
  import { page } from "$app/stores";
  export let chosenPaymentMethod: any;
</script>

<div class="space-y-4">
  <h2 class="text-lg font-medium text-gray-900 my-4">
    Available payment methods
  </h2>

  <fieldset
    class="flex flex-col md:flex-row justify-around space-y-2 md:space-y-0 md:space-x-10"
  >
    {#each $page.data.paymentMethods as paymentMethod}
      <label
        class="group relative flex items-center justify-center rounded-md border h-20 py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
        aria-disabled={!paymentMethod.available}
        for={`radio-input-${paymentMethod.id}`}
      >
        <input
          type="radio"
          id={`radio-input-${paymentMethod.id}`}
          bind:group={chosenPaymentMethod}
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
          {paymentMethod.label}
        </span>
      </label>
    {/each}
    <input type="text" hidden name="payment_id">
  </fieldset>
</div>

<style>
</style>
