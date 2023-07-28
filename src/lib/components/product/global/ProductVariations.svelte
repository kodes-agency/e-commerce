<script lang="ts">
  import { getVariations } from "$lib/functions/product/getProductVariations.js";
  import { createEventDispatcher } from "svelte";
 
  export let attributes: any
  export let variations: any;
  export let style: string = "";
  export let text: string = "";
 
  let ordered = false;
  let productVariations = getVariations(attributes, variations);
  const dispatch = createEventDispatcher();

  function variationName(variation: string) {
    return variation.substring(variation.indexOf(":") + 1);
  }

  async function onChange(event: any) {
    dispatch("variationChange", {
      id: Number(event.target.value),
      change: true,
      max: Number(event.target.dataset.max),
      quantity: 1,
    });
  }
</script>

{#if !ordered}
  <div class={style}>
    {#if attributes.length > 0}
      {#await productVariations}
        <p>...loading variations</p>
      {:then variation}
        {#if text}
          {#each attributes as attribute}
            <p class="title">{text} {attribute.name}:&nbsp</p>
          {/each}
        {/if}
        {#each variation as element}
          {#if element.is_in_stock}
            <input
              type="radio"
              name={element.parent}
              id={element.id}
              value={element.id}
              data-max={element.add_to_cart.maximum}
              on:change={onChange}
            />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <label for={element.id} on:click={async () => {}}
              >{variationName(element.variation)}
            </label>
            <p class="divider">&nbsp/&nbsp</p>
          {/if}
        {/each}
      {/await}
    {/if}
  </div>
{/if}

<style>
  input {
    visibility: hidden;
    height: 0px;
    width: 0px;
  }

  label {
    cursor: pointer;
  }

  input[type="radio"]:checked + label {
    font-weight: bold;
  }

  .divider:last-of-type {
    display: none;
  }
</style>
