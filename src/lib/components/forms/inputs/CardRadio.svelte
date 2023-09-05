<script lang="ts">
    export let disabled: boolean
    export let id: number | string
    export let value: any
    export let label: string
    export let group: any
</script>

<label
  class="group relative flex items-center justify-center rounded-md border h-20 py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
  aria-disabled={disabled}
  for={`radio-input-${id}`}
>
  <input
    type="radio"
    id={`radio-input-${id}`}
    bind:group={group}
    name="payment_method"
    value={value}
    class="sr-only peer"
    aria-labelledby="size-choice-1-label"
    disabled={disabled}
  />
  <span
    class="flex justify-center items-center text-center pointer-events-none absolute -inset-px rounded-md border-4 peer-checked:border-blue-500 peer-disabled:bg-gray-300 peer-checked:bg-blue-100 peer-disabled:text-gray-500"
    aria-hidden="true"
  >
    {label}
  </span>
</label>
