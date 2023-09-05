<script lang="ts">
    import { slide } from "svelte/transition";
</script>

<fieldset transition:slide>
  <h2 class="text-lg font-medium text-gray-900 my-4">Shipping details</h2>
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
      <label class="whitespace-nowrap" for="shipping_postcode">Post code:</label
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