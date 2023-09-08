<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { Toast, Modal, storePopup } from "@skeletonlabs/skeleton";
  import { cartStore } from "$lib/store/store";
  import { isCartOpen } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import Cart from "$lib/components/cart/Cart.svelte";
  import CardPayment from "$lib/components/checkout/CardPayment.svelte";
  import type { ModalComponent } from "@skeletonlabs/skeleton";

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const modalComponentRegistry: Record<string, ModalComponent> = {
    paymentModal: { ref: CardPayment },
  };

  $cartStore = getCart();

  function openCart() {
    $isCartOpen = !$isCartOpen;
  }
</script>

<main>
  <Modal components={modalComponentRegistry} />
  <nav
    class="bg-[var(--white-color)] h-10 flex items-center justify-between px-4 fixed top-0 w-full z-10"
  >
    <div>
      <a href="/">Home</a>
      <a href="/checkout">Checkout</a>
    </div>
    {#await $cartStore}
      ...loading
    {:then cart}
      <Cart {cart} />
      <button
        on:click={() => {
          openCart();
        }}
        ><svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1065_9)">
            <path
              d="M8.84766 15.8594H24.082V8.53516L7.01172 4.96094L6.40625 2.44141L3.94531 1.62109C3.94531 1.58203 3.96484 1.5625 3.96484 1.52344C3.96484 0.683594 3.28125 0 2.44141 0C1.60156 0 0.917969 0.683594 0.917969 1.52344C0.917969 2.36328 1.60156 3.04688 2.44141 3.04688C2.79297 3.04688 3.10547 2.92969 3.35938 2.73438L5.19531 3.65234L7.61719 15.2344L5.17578 17.0703V20.1172L6.28906 21.5039C5.97656 21.875 5.80078 22.3438 5.80078 22.8711C5.80078 24.043 6.75781 25 7.92969 25C9.10156 25 10.0586 24.043 10.0586 22.8711C10.0586 21.6992 9.10156 20.7422 7.92969 20.7422C7.75391 20.7422 7.57812 20.7617 7.42188 20.8008L7.01172 20.1367H19.8242L20.5273 21.3086C20.0977 21.6992 19.8242 22.2656 19.8242 22.8906C19.8242 24.0625 20.7812 25.0195 21.9531 25.0195C23.125 25.0195 24.082 24.0625 24.082 22.8906C24.082 21.7188 23.125 20.7617 21.9531 20.7617C21.9336 20.7617 21.9141 20.7617 21.8945 20.7617L21.6406 20.1562H24.082V18.9453H6.40625V17.7344L8.84766 15.8594ZM8.84766 14.6289L7.94922 10.4492L8.06641 11.0352L11.6797 11.3281L12.4219 14.6484H8.84766V14.6289ZM13.1055 14.6289L12.3828 11.3672L15.918 11.6406L16.1914 14.6289H13.1055ZM16.7773 14.6289L16.5039 11.6992L19.8242 11.9531V14.6289H16.7773ZM22.8711 11.582V14.6289H20.4297V12.0117L22.8711 12.207V11.582L20.4297 11.3867V8.67188L22.8711 9.14062V11.582ZM7.01172 6.09375L19.8242 8.55469V11.3281L16.4453 11.0547L16.1523 7.85156L15.5469 7.73437L15.8594 11.0156L12.2461 10.7227L11.4062 6.95312L10.6836 6.81641L11.543 10.6641L7.92969 10.3711L7.01172 6.09375ZM21.9531 21.9531C22.4609 21.9531 22.8711 22.3633 22.8711 22.8711C22.8711 23.3789 22.4609 23.7891 21.9531 23.7891C21.4453 23.7891 21.0352 23.3789 21.0352 22.8711C21.0352 22.3633 21.4453 21.9531 21.9531 21.9531ZM7.92969 21.9531C8.4375 21.9531 8.84766 22.3633 8.84766 22.8711C8.84766 23.3789 8.4375 23.7891 7.92969 23.7891C7.42187 23.7891 7.01172 23.3789 7.01172 22.8711C7.01172 22.3633 7.42187 21.9531 7.92969 21.9531Z"
              fill="#181818"
            />
          </g>
          <defs>
            <clipPath id="clip0_1065_9">
              <rect width="25" height="25" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    {/await}
  </nav>
  <slot />
  <Toast />
</main>
