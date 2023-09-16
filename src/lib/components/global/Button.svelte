<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let attributes: Array<any> = [];
  export let variationChange: boolean = false;
  export let href: string = "#";
  export let text: string = "";
  export let type: "add-to-cart-button" | "link";
  export let style: string =
    "bg-amber-300 text-[var(--black-color)] py-1 w-fit px-8 hover:bg-[var(--black-color)] hover:text-[var(--white-color)] focus:ring focus:ring-slate-300";

  const dispatch = createEventDispatcher();
</script>

{#if type == "link"}
  <a class={style} {href}>{text}</a>
{:else if type == "add-to-cart-button"}
  <button
    class="{style} md:border md:border-[var(--black-color)] font-bold md:font-normal fixed bottom-0 left-0 md:static h-16 md:h-auto z-20 w-full md:w-fit"
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
