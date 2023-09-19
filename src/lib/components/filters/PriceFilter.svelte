<script lang="ts">
  // @ts-ignore
  import RangeSlider from "svelte-range-slider-pips";
  import { filterMinMax } from "$lib/store/store";
  import { page } from "$app/stores";
  import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
  import { goto, invalidateAll } from "$app/navigation";

  let arrowSVG: any;
  let filterButton: HTMLButtonElement;

  let min = $page.data.filters.price.min;
  let max = $page.data.filters.price.max;

  const minMaxPopup: PopupSettings = {
    event: "click",
    target: "minMaxFilter",
    placement: "bottom",
    state: (e) => {
      if (e.state) {
        arrowSVG.style.transform = "rotate(0deg)";
        filterButton.style.backgroundColor = "var(--yellow-color)";
      }
      if (!e.state) {
        arrowSVG.style.transform = "rotate(180deg)";
        if ($filterMinMax[0] !== min || $filterMinMax[1] !== max) {
          return;
        }
        filterButton.style.backgroundColor = "var(--white-color)";
      }
    },
  };

</script>

<button
  bind:this={filterButton}
  class="{$filterMinMax[0] !== min || $filterMinMax[1] !== max
    ? 'bg-[var(--yellow-color)]'
    : 'bg-[var(--white-color)]'} mt-4 lg:m-0 border border-[var(--black-color)] text-black w-[250px] py-1 relative uppercase"
  use:popup={minMaxPopup}
>
  Цена
  <svg
    bind:this={arrowSVG}
    class="absolute right-5 top-2.5 rotate-180 transition-transform duration-300"
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    ><style>
      svg {
        fill: #222221;
      }
    </style><path
      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
    /></svg
  >
</button>
<div data-popup="minMaxFilter" class="z-20">
  <div
    class="bg-[var(--white-color)] w-[250px] border border-[var(--gray-color)] space-y-5 py-5 p-5 flex flex-col"
  >
    <RangeSlider
      {min}
      {max}
      float
      pips
      pipstep={5}
      range
      bind:values={$filterMinMax}
      first="label"
      last="label"
      suffix=" лв."
      on:stop={()=>{
        goto(`?${$page.url.searchParams.get('category') ? "category="+$page.url.searchParams.get('category')+"&" : "" }min_price=${$filterMinMax[0]*100}&max_price=${$filterMinMax[1]*100+"&"}${$page.url.searchParams.get('order') ? "order="+$page.url.searchParams.get('order')+"&" : "" }${$page.url.searchParams.get('orderby') ? "orderby="+$page.url.searchParams.get('orderby') : "" }`)
        invalidateAll
        }}
    />
    <div class="flex justify-between items-center">
      <p>от</p>
      <span
        class="bg-black flex items-center justify-center p-3 min-w-[50px] h-8"
      >
        <p class="text-white text-sm">{$filterMinMax[0]}</p>
      </span>
      <p>до</p>
      <span
        class="bg-black flex items-center justify-center min-w-[50px] p-3 h-8"
      >
        <p class="text-white text-sm">{$filterMinMax[1]}</p>
      </span>
      <p>лв.</p>
    </div>
    <button
      type="button"
      aria-label="clear price filter"
      
      class="italic text-sm pt-2"
      on:click={() => {
        $filterMinMax = [min, max, 0, 100];
        goto(`?${$page.url.searchParams.get('category') ? "category="+$page.url.searchParams.get('category')+"&" : ""}${$page.url.searchParams.get('order') ? "order="+$page.url.searchParams.get('order')+"&" : "" }${$page.url.searchParams.get('orderby') ? "orderby="+$page.url.searchParams.get('orderby') : "" }`)
      }}>изчисти</button
    >
  </div>
</div>