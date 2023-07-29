<script lang="ts">
    import SingleCartItem from "$lib/components/cart/CartItem.svelte";
    import { slide } from "svelte/transition";
    export let cart: any;
  </script>
  
  <div class="flex flex-col">
    {#each cart.items as item}
    <div transition:slide>
      <SingleCartItem {item} />
    </div>
    {/each}
  </div>
