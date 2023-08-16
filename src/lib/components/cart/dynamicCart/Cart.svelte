<script>
  import CartGrid from "../dynamicCart/CartGrid.svelte";
  import { cartStore } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import CartItem from "../dynamicCart/CartItem.svelte";
  $cartStore = getCart();
</script>

<div class="sticky top-">
  {#await $cartStore}
    <p>Loading...</p>
  {:then cart}
    <CartGrid>
      <svelte:fragment slot="cart-item">
        {#each cart.items as item}
          <CartItem {item} />
        {/each}
      </svelte:fragment>
    </CartGrid>
  {/await}
</div>

<style>
</style>
