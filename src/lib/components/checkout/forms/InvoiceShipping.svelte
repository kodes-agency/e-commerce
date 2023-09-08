<script lang="ts">
  export let companyInvoice:any
</script>

<span class="flex space-x-2 items-center">
  <input
    type="checkbox"
    id="company_invoice"
    bind:checked={companyInvoice}
    name="company_invoice"
    class="form-checkbox"
  />
  <label for="company_invoice">
    Желая да ми бъде издадена фактура на фирма</label>
</span>
