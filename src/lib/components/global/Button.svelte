<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let attributes: Array<any> = [];
  export let variationChange: boolean = false;
  export let href: string = "#";
  export let text: string = "";
  export let type: "add-to-cart-button" | "link";
  export let style: string =
    "border border-black bg-amber-300 text-slate-950 py-0.5 w-fit px-10 hover:bg-slate-950 hover:text-slate-100 focus:ring focus:ring-slate-300";

  const dispatch = createEventDispatcher();
</script>

{#if type == "link"}
  <a class={style} {href}>{text}</a>
{:else if type == "add-to-cart-button"}
  <button
    class={style}
    disabled={attributes.length > 0 && !variationChange}
    on:click={() => {
      dispatch("order", { ordered: true });
    }}
  >
    {text}
  </button>
{/if}

<style>
  a {
    text-align: center;
  }
</style>
