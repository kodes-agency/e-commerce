<script lang="ts">
  //@ts-ignore
  import { gsap } from "gsap/dist/gsap";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import {
    filterHeading,
    isCartOpen,
    cartStore,
    logoColor,
  } from "$lib/store/store";
  import { getCart } from "$lib/functions/cart/cartFunctions";
  import Cart from "$lib/components/cart/Cart.svelte";

  let fadeAnimationElements;
  let navLinks: HTMLElement[];
  $: pathColor = $logoColor;

  function linkMouseEnterAnimation(event: any) {
    navLinks.forEach((link) => {
      link.style.transform = "scale(0.8)";
      link.style.opacity = "0.4";
      event.target.style.transform = "scale(1.2)";
      event.target.style.opacity = "1";
    });
  }

  function linkMouseLeaveAnimation() {
    navLinks.forEach((link) => {
      link.style.opacity = "1";
      link.style.transform = "scale(1)";
    });
  }

  let isOpen = false;
  let openTl = gsap.timeline({
    paused: true,
    ease: "Power1.easeOut",
    onStart: () => {
      pathColor = "var(--black-color)";
      isOpen = true;
    },
    onReverseComplete: () => {
      pathColor = $logoColor;
      isOpen = false;
    },
  });

  function initMenuAnimation() {
    openTl.reversed(!openTl.reversed());
  }

  onMount(async () => {
    fadeAnimationElements = document.querySelectorAll(".nav-animation");
    // @ts-expect-error
    navLinks = document.querySelectorAll(".nav-link");

    openTl.set(".menu", {
      display: "flex",
    });

    openTl.to(".menu", {
      opacity: 1,
      duration: 0.5,
    });

    openTl.from(fadeAnimationElements, {
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
    });
    openTl.reverse();

    $cartStore = getCart();
    });



  function openCart() {
    $isCartOpen = !$isCartOpen;
    if($isCartOpen == true && isOpen == true){
      initMenuAnimation()
    }
  }
  
</script>

<nav class="fixed w-full top-2 md:top-0 z-50">
  <section
    class="flex justify-between items-center md:items-start p-4 md:p-0 md:px-10 md:pt-10 lg:px-14"
  >
    <!-- Logo container  -->
    <div class="">
      <a
        aria-label="Home page"
        href="/"
        on:click={() => {
          if (isOpen == true) {
            initMenuAnimation();
          }
        }}
        data-sveltekit-preload-data="tap"
      >
        <svg
          id="logo"
          width="200"
          height="28"
          viewBox="0 0 200 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[150px] md:w-auto"
        >
          <g clip-path="url(#clip0_137_13)">
            <path
              d="M0 1.68942V27.4233H5.75376V16.7917H16.7068V12.3925H5.75376V6.44634H18.3929V1.68942H0Z"
              fill={pathColor}
            />
            <path
              d="M34.0863 13.3313C35.4043 13.3313 36.395 13.0407 37.054 12.464C37.713 11.8873 38.0448 10.9529 38.0448 9.65189C38.0448 8.35089 37.7176 7.49697 37.054 6.92918C36.395 6.36586 35.4043 6.08421 34.0863 6.08421H27.7871V13.3313H34.0863ZM36.136 1.68942C37.3085 1.68942 38.3629 1.8772 39.3037 2.24827C40.2445 2.61935 41.0489 3.12902 41.7216 3.78175C42.3942 4.43001 42.9032 5.18111 43.2623 6.03503C43.6168 6.88895 43.794 7.80546 43.794 8.7935C43.794 10.3091 43.4713 11.619 42.8214 12.7233C42.1761 13.8276 41.1171 14.6681 39.6537 15.2448V15.3164C40.3627 15.5086 40.949 15.8037 41.4125 16.2016C41.8761 16.5995 42.2533 17.0645 42.5487 17.6054C42.8442 18.1464 43.0578 18.741 43.1896 19.3893C43.3259 20.0375 43.4168 20.6858 43.4622 21.3385C43.485 21.7454 43.5122 22.2282 43.535 22.7781C43.5577 23.3325 43.6031 23.8958 43.6622 24.4725C43.7213 25.0493 43.8213 25.5947 43.9576 26.1133C44.094 26.6275 44.294 27.0701 44.5621 27.4277H38.8083C38.4902 26.6096 38.2948 25.6394 38.2221 24.5083C38.1493 23.3772 38.0403 22.2997 37.8948 21.2625C37.6994 19.9168 37.2858 18.9332 36.6495 18.3073C36.0133 17.6814 34.977 17.3685 33.5363 17.3685H27.7826V27.4233H22.0288V1.68942H36.136Z"
              fill={pathColor}
            />
            <path
              d="M58.4829 8.03347H58.5556L61.8552 17.4758H55.0788L58.4829 8.03347ZM55.6242 1.68942L45.7346 27.4233H51.5202L53.5745 21.6917H63.3549L65.3319 27.4233H71.3039L61.5234 1.68942H55.6242Z"
              fill={pathColor}
            />
            <path
              d="M87.4926 27.2221C86.2473 27.7362 84.9884 27.9956 83.7204 27.9956C81.7161 27.9956 79.9164 27.6513 78.3166 26.9673C76.7168 26.2832 75.367 25.3399 74.2671 24.1373C73.1673 22.9346 72.3265 21.5263 71.7402 19.9034C71.1539 18.2805 70.863 16.5325 70.863 14.6592C70.863 12.7859 71.1539 10.9529 71.7402 9.30767C72.3265 7.66242 73.1673 6.2273 74.2671 5.0023C75.367 3.7773 76.7168 2.81609 78.3166 2.11864C79.9164 1.4212 81.7161 1.07248 83.7204 1.07248C85.0657 1.07248 86.3655 1.26919 87.6198 1.66709C88.8788 2.06499 90.015 2.6462 91.0285 3.41517C92.042 4.18415 92.8782 5.13195 93.5372 6.26306C94.1962 7.39417 94.6007 8.6907 94.7461 10.1571H89.2514C88.9106 8.71305 88.2516 7.63112 87.2744 6.91133C86.2973 6.19153 85.1111 5.8294 83.7204 5.8294C82.4251 5.8294 81.3252 6.07529 80.4208 6.56708C79.5164 7.05886 78.7847 7.72054 78.2211 8.54763C77.6576 9.37473 77.2485 10.3181 76.994 11.3776C76.7395 12.4372 76.6077 13.5281 76.6077 14.6547C76.6077 15.7814 76.735 16.7873 76.994 17.8111C77.2485 18.8304 77.6576 19.7514 78.2211 20.5696C78.7847 21.3877 79.5164 22.0405 80.4208 22.5323C81.3252 23.024 82.4251 23.2699 83.7204 23.2699C85.6247 23.2699 87.0972 22.796 88.1334 21.8438C89.1696 20.8959 89.7741 19.5189 89.9468 17.7172H84.1567V13.5013H95.1461V27.4144H91.483L90.8967 24.4949C89.8695 25.7915 88.7333 26.699 87.488 27.2176"
              fill={pathColor}
            />
            <path
              d="M119.875 1.68942L114.089 19.3848H114.016L107.894 1.68942H99.8V27.4233H105.186V9.36576H105.258L111.671 27.4233H116.102L122.515 9.18693H122.588V27.4233H127.973V1.68942H119.875Z"
              fill={pathColor}
            />
            <path
              d="M133.027 1.68942V27.4233H152.884V22.6664H138.781V16.3581H151.457V11.9633H138.781V6.44634H152.593V1.68942H133.027Z"
              fill={pathColor}
            />
            <path
              d="M173.476 1.68942V18.9511H173.399L162.482 1.68942H156.77V27.4233H162.155V10.1973H162.228L173.108 27.4233H178.857V6.44634H186.406V27.4233H192.16V6.44634H200V1.68942H173.476Z"
              fill={pathColor}
            />
          </g>
          <defs>
            <clipPath id="clip0_137_13">
              <rect
                width="200"
                height="26.9231"
                fill="white"
                transform="translate(0 1.07693)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
    <!-- Navigation elements -->
    <div class="flex justify-between items-center space-x-10">
      <!-- Cart button -->
      {#if $page.route.id != "/checkout" }
        {#await $cartStore}
          .
        {:then cart}
          
          <Cart {cart} />
          <button
            class="flex relative"
            on:click={() => {
              openCart();
            }}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1065_9)">
                <path
                  d="M8.84766 15.8594H24.082V8.53516L7.01172 4.96094L6.40625 2.44141L3.94531 1.62109C3.94531 1.58203 3.96484 1.5625 3.96484 1.52344C3.96484 0.683594 3.28125 0 2.44141 0C1.60156 0 0.917969 0.683594 0.917969 1.52344C0.917969 2.36328 1.60156 3.04688 2.44141 3.04688C2.79297 3.04688 3.10547 2.92969 3.35938 2.73438L5.19531 3.65234L7.61719 15.2344L5.17578 17.0703V20.1172L6.28906 21.5039C5.97656 21.875 5.80078 22.3438 5.80078 22.8711C5.80078 24.043 6.75781 25 7.92969 25C9.10156 25 10.0586 24.043 10.0586 22.8711C10.0586 21.6992 9.10156 20.7422 7.92969 20.7422C7.75391 20.7422 7.57812 20.7617 7.42188 20.8008L7.01172 20.1367H19.8242L20.5273 21.3086C20.0977 21.6992 19.8242 22.2656 19.8242 22.8906C19.8242 24.0625 20.7812 25.0195 21.9531 25.0195C23.125 25.0195 24.082 24.0625 24.082 22.8906C24.082 21.7188 23.125 20.7617 21.9531 20.7617C21.9336 20.7617 21.9141 20.7617 21.8945 20.7617L21.6406 20.1562H24.082V18.9453H6.40625V17.7344L8.84766 15.8594ZM8.84766 14.6289L7.94922 10.4492L8.06641 11.0352L11.6797 11.3281L12.4219 14.6484H8.84766V14.6289ZM13.1055 14.6289L12.3828 11.3672L15.918 11.6406L16.1914 14.6289H13.1055ZM16.7773 14.6289L16.5039 11.6992L19.8242 11.9531V14.6289H16.7773ZM22.8711 11.582V14.6289H20.4297V12.0117L22.8711 12.207V11.582L20.4297 11.3867V8.67188L22.8711 9.14062V11.582ZM7.01172 6.09375L19.8242 8.55469V11.3281L16.4453 11.0547L16.1523 7.85156L15.5469 7.73437L15.8594 11.0156L12.2461 10.7227L11.4062 6.95312L10.6836 6.81641L11.543 10.6641L7.92969 10.3711L7.01172 6.09375ZM21.9531 21.9531C22.4609 21.9531 22.8711 22.3633 22.8711 22.8711C22.8711 23.3789 22.4609 23.7891 21.9531 23.7891C21.4453 23.7891 21.0352 23.3789 21.0352 22.8711C21.0352 22.3633 21.4453 21.9531 21.9531 21.9531ZM7.92969 21.9531C8.4375 21.9531 8.84766 22.3633 8.84766 22.8711C8.84766 23.3789 8.4375 23.7891 7.92969 23.7891C7.42187 23.7891 7.01172 23.3789 7.01172 22.8711C7.01172 22.3633 7.42187 21.9531 7.92969 21.9531Z"
                  fill={pathColor}
                />
              </g>
              <defs>
                <clipPath id="clip0_1065_9">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {#if cart.items.length > 0}
              <span
                class="bg-[var(--yellow-color)] h-5 w-5 rounded-full text-sm flex items-center justify-center absolute -right-3 -top-2"
                >{cart.items.length}</span
              >
            {/if}
          </button>
        {/await}
      {/if}
      <!-- Navigation button -->
      <button
        id="toggle"
        aria-label="Menu toggle button"
        class="transition-all {isOpen ? 'isRotated' : ''}"
        on:click={() => {
          initMenuAnimation();
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class=""
        >
          <line
            x1="1"
            y1="11.0476"
            x2="21"
            y2="11.0476"
            stroke={pathColor}
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="11"
            y1="21"
            x2="11"
            y2="1"
            stroke={pathColor}
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </section>
</nav>
<!-- Navigation menu modal -->
<div
  class="menu hidden opacity-0 bg-white fixed top-0 py-5 px-5 md:px-10 lg:px-12 z-40 flex-col min-h-screen justify-end space-y-6 md:space-y-10 items-center w-full"
>
  <div class="flex flex-col space-y-5">
    <!-- Navigation links -->
    <div
      class="nav-animation text-center flex flex-col text-3xl lg:text-5xl space-y-2 pb-8"
    >
      <a
        class=" hover:-translate-y-5 transition-all duration-300 nav-link p-1"
        on:click={() => {
          initMenuAnimation();
          $filterHeading = "";
        }}
        on:mouseenter={(event) => {
          linkMouseEnterAnimation(event);
        }}
        on:mouseleave={() => {
          linkMouseLeaveAnimation();
        }}
        data-sveltekit-preload-data="tap"
        href="/product?order=desc&orderby=popularity"
        >всички продукти
      </a>
      {#each $page?.data?.categories as category}
        {#if category.name != "Uncategorized"}
          <a
            class=" hover:-translate-y-5 transition-all lowercase all duration-300 nav-link p-1"
            on:click={() => {
              initMenuAnimation();
              $filterHeading = category.name;
            }}
            on:mouseenter={(event) => {
              linkMouseEnterAnimation(event);
            }}
            on:mouseleave={() => {
              linkMouseLeaveAnimation();
            }}
            data-sveltekit-preload-data="tap"
            href="/product?category={category.id}"
            >{category.name}
          </a>
        {/if}
      {/each}
      <a
        class=" hover:-translate-y-5 transition-all duration-300 nav-link p-1"
        on:click={() => {
          initMenuAnimation();
          $filterHeading = "";
        }}
        on:mouseenter={(event) => {
          linkMouseEnterAnimation(event);
        }}
        on:mouseleave={() => {
          linkMouseLeaveAnimation();
        }}
        data-sveltekit-preload-data="tap"
        href="/"
        >често задавани въпроси
      </a>
      <a
        class=" hover:-translate-y-5 transition-all duration-300 nav-link underline p-1"
        on:click={() => {
          initMenuAnimation();
          $filterHeading = "";
        }}
        on:mouseenter={(event) => {
          linkMouseEnterAnimation(event);
        }}
        on:mouseleave={() => {
          linkMouseLeaveAnimation();
        }}
        href="https://fragment.bg/"
        >към fragment.bg
      </a>
    </div>
  </div>

  <!-- Bottom modal links -->
  <div class="flex flex-col items-center nav-animation w-full pb-8">
    <div class="bg-black my-4 h-px w-full" />
    <div class="flex flex-col md:flex-row space-y-3 md justify-between w-full">
      <a
        on:click={initMenuAnimation}        
        class="text-center md:text-start md:w-[215px]" href="/policy"
        >общи условия</a
      >
      <a
        on:click={initMenuAnimation}        
        class="text-center md:w-[215px]" href="/gdpr"
        >политика за личните данни</a
      >
      <a
        on:click={initMenuAnimation}        
        class="text-center md:text-end md:w-[215px]" href="/cookies"
        >политика за бисквитките</a
      >
    </div>
  </div>
</div>

<style lang="postcss">
  .isRotated {
    transform: rotate(45deg);
  }
</style>
