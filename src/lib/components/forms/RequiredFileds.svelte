<script lang="ts">
    import { page } from "$app/stores";
</script>

<h2 class="text-lg font-medium text-gray-900">Billing details</h2>
<div class="flex flex-col sm:flex-row sm:space-x-10 items-center">
  <div class="flex flex-col w-full">
    <label class="whitespace-nowrap" for="billing_first_name">First name:</label
    >
    <input
      type="text"
      class="form-input bg-transparent px-3 min-w-0 w-full"
      name="billing_first_name"
      id="billing_first_name"
      value={$page?.data?.form?.billing_address.first_name || ""}
      required
    />
  </div>
  <div class="flex flex-col w-full">
    <label class="whitespace-nowrap" for="billing_last_name">Last name:</label>
    <input
      type="text"
      class="form-input bg-transparent px-3 w-full"
      name="billing_last_name"
      id="billing_last_name"
      value={$page?.data?.form?.billing_address.last_name || ""}
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
      value={$page?.data?.form?.billing_address.email || ""}
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
      value={$page?.data?.form?.billing_address.phone || ""}
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
      value={$page?.data?.form?.billing_address.city || ""}
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
      value={$page?.data?.form?.billing_address.postcode || ""}
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
    value={$page?.data?.form?.billing_address.address_1 || ""}
    required
  />
</div>

<style>
</style>
