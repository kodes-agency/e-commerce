<script lang="ts">
  export let shippingAddress:string
  export let companyInvoice:string
</script>

<fieldset
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
</fieldset>