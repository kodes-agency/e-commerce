<script lang="ts">
  import { createEventDispatcher } from "svelte";
 
  export let variations: any;
  export let text: string = "Изберете размер:";  

  const dispatch = createEventDispatcher();

  async function onChange(event: any) {
    dispatch("variationChange", {
      id: Number(event.target.value),
      change: true,
      // max: Number(event.target.dataset.max),
      quantity: 1,
    });
  }

</script>

<section>
  <p>{text}</p>
  <div class="flex">
    {#each variations as variation}
    <div class="flex">
      <input id="var-{variation.id}" disabled={!variation.is_in_stock} data-maximum={variation.add_to_cart.maximum} type="radio" class="sr-only form-radio peer" name="variation" value={variation.id} on:change={onChange}>
      <label for="var-{variation.id}" class="relative peer-checked:font-bold peer-disabled:bg-zinc-300 peer-checked:bg-[var(--yellow-color)] text-lg cursor-pointer border border-[var(--black-color)] h-10 w-10 flex items-center justify-center mr-3">
        {variation.variation.replace("size: ", "")}
        {#if !variation.is_in_stock }
          <div class="w-full h-px bg-black opacity-50 absolute rotate-45"></div>
          <div class="w-full h-px bg-black opacity-50 absolute -rotate-45"></div>
        {/if}
      </label>
    </div>
    {/each}
  </div>
</section>

