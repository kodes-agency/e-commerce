<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string;
  export let name: string;
  export let label: string;
  export let value: any;
  export let checked: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<label
  class="group relative flex items-center justify-center rounded-md border h-20 py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm"
  for={id}
>
  <input
    {value}
    type="radio"
    {id}
    {name}
    {checked}
    class="sr-only peer"
    on:change={()=>{
        dispatch("valueChange", {value})
    }}
  />
  <span
    class="flex justify-center items-center pointer-events-none absolute -inset-px rounded-md text-center border-4 p-4 text-xs peer-checked:border-blue-500 peer-disabled:border-gray-300 peer-checked:bg-blue-100"
    >{label}</span
  >
</label>
