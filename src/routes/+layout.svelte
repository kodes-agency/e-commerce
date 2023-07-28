<script>
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import { Toast } from "@skeletonlabs/skeleton";

</script>

<main>
  <nav>
    <a href="/">Home</a>
    <a href="/cart">Cart</a>
    <a href="/checkout">Checkout</a>
  </nav>
  <slot />
  <Toast />
</main>
