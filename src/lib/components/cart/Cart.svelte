<script lang="ts">
  import { priceFormat } from "$lib/functions/global/priceFormat";
  import CartItem from "$lib/components/cart/CartItem.svelte";
  import { isCartOpen } from "$lib/store/store";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  export let cart: any;

  let animationTl = gsap.timeline({
  });

  let panel: any;
  let backdrop: any;
  let cartModal: any;
  let closeSection: any;

  function backdropClose(event:any) {
    if (event.target === closeSection && $isCartOpen) {
      $isCartOpen = !$isCartOpen;
    }
  }

  function toggle() {
      $isCartOpen = !$isCartOpen;
  }

  function toggleAnimation(){
    animationTl.reversed(!animationTl.reversed())
  }

  onMount(()=>{
    animationTl.set(cartModal, { display: "block"})
    animationTl.to(backdrop, { opacity: 1, duration: 0.5, ease: ".inOut" });
    animationTl.to(panel, { x: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.5");
  })

  $: isCartOpen.subscribe(() => {
    toggleAnimation()
  });
</script>

<div
  class="relative hidden z-50"
  aria-labelledby="slide-over-title"
  role="dialog"
  aria-modal="true"
  bind:this={cartModal}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div bind:this={backdrop} class="fixed inset-0 bg-amber-100 opacity-0 bg-opacity-75 transition-opacity" />
  <div class="fixed inset-0 overflow-hidden">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="absolute inset-0 overflow-hidden" on:click={backdropClose} bind:this={closeSection}>
      <div
        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10"
      >
        <div bind:this={panel} class="pointer-events-auto w-screen max-w-md translate-x-full">
          <div
            class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
          >
            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div class="flex items-start justify-between">
                <h2
                  class="text-lg font-bold text-gray-900"
                  id="slide-over-title"
                >
                  Вашата количка
                </h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    on:click={toggle}
                  >
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Затвори</span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <div class="flow-root">
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    {#each cart.items as item}
                      <CartItem {item}></CartItem>
                    {/each}

                  </ul>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div
                class="flex justify-between text-base font-bold text-gray-900"
              >
                <p>Общо</p>
                <p>{priceFormat(cart.totals.total_price)}{cart.totals.currency_suffix}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500">
                Стойността на доставката и отстъпките се калкулират при приключване на поръчката.
              </p>
              <div class="mt-6">
                <a
                  href="/checkout"
                  on:click={toggle}
                  class="flex items-center justify-center border border-transparent bg-[var(--yellow-color)] px-6 py-3 text-base font-bold text-[var(--black-color)] shadow-sm hover:bg-[var(--black-color)] hover:text-[var(--white-color)] 
                  {cart.items.length === 0 ? " pointer-events-none cursor-not-allowed bg-gray-300" : ""}"
                  >Поръчай</a
                >
              </div>
              <div
                class="mt-6 flex justify-center text-center text-sm text-gray-500"
              >
                <p>
                  или
                  <button
                    type="button"
                    class="font-bold text-[var(--black-color)]"
                    on:click={toggle}
                  >
                    Продължи с пазаруването
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>