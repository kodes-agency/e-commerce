<script>
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import { Toast } from "@skeletonlabs/skeleton";
  import { cartStore } from "$lib/store/store";
  import { isCartOpen } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import DemoCart from "$lib/components/cart/modalCart/demoCart.svelte";
  $cartStore = getCart();

  function openCart() {
    $isCartOpen = !$isCartOpen;
  }

</script>

<main>
  <nav class="bg-white h-10 flex items-center justify-between px-4 fixed top-0 w-full z-10">
    <div>
      <a href="/">Home</a>
      <a href="/checkout">Checkout</a>
    </div>
    {#await $cartStore }
    ...loading
    {:then cart }
    
    <DemoCart {cart}></DemoCart>
    <button on:click={()=>{openCart()}}>Cart</button>
      
    {/await}
  </nav>
  <slot />
  <Toast />
</main>
