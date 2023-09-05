<script lang="ts">
    import { slide } from "svelte/transition";
</script>

<fieldset transition:slide>
  <h2 class="text-lg font-medium text-gray-900 my-4">Invoice details</h2>
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
