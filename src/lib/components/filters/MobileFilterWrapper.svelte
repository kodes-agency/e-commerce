<script lang="ts">
  import { filterCategory } from "$lib/store/store";
  import RangeSlider from "svelte-range-slider-pips";
  import { filterSort } from "$lib/store/store";
  import { filterMinMax } from "$lib/store/store";
  import { page } from "$app/stores";
  import { drawerStore } from "@skeletonlabs/skeleton";
  import type { DrawerSettings } from "@skeletonlabs/skeleton";

  const drawerSettings: DrawerSettings = {
    id: "filterDrawer",
  }

  let min = $page.data.filters.price.min;
  let max = $page.data.filters.price.max;

  let categories = [
    {
      name: "Мода",
      slug: "fashion",
      id: 19,
    },
    {
      name: "Бижута и аксесоари",
      slug: "jewelry",
      id: 21,
    },
    {
      name: "За дома",
      slug: "home",
      id: 22,
    },
    {
      name: "Храна и напитки",
      slug: "foods",
      id: 20,
    },
  ];

  let sortFilters = [
    {
      name: "Цена (възходящо)",
      orderBy: "priceAsc",
      order: "asc",
      filterString: "order=asc&orderby=price",
    },
    {
      name: "Цена (низходящо)",
      orderBy: "priceDecs",
      filterString: "order=desc&orderby=price",
    },
    {
      name: "Наскоро добавени",
      orderBy: "date",
      filterString: "order=desc&orderby=date",
    },
    {
      name: "Най-продавани",
      orderBy: "popularity",
      filterString: "order=desc&orderby=popularity",
    },
  ];
</script>

<div class="bg-[var(--white-color)] p-5 pt-16 space-y-5">
    <p class="font-bold uppercase">Филтрирай по категория</p>
    <div class="flex flex-col space-y-2">
      {#each categories as category}
        <div>
          <input
            class="sr-only peer"
            type="checkbox"
            name={category.slug}
            id={category.slug}
            value={category.id}
            bind:group={$filterCategory}
          />
          <label
            class="cursor-pointer text-black uppercase peer-checked:font-bold"
            for={category.slug}
          >
            {category.name}
          </label>
        </div>
      {/each}
    </div>
</div>
<div
  class="bg-[var(--white-color)] border p-5"
>
    <div class="flex flex-col space-y-10 max-w-sm">
        <p class="font-bold uppercase">Филтрирай по цена</p>
    
      <RangeSlider
        {min}
        {max}
        float
        pips
        range
        bind:values={$filterMinMax}
        first="label"
        last="label"
        suffix=" лв."
      />
      <div class="flex justify-between px-14 items-center pt-7">
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
        class="italic text-sm"
        on:click={() => {
          $filterMinMax = [min, max, 0, 100];
        }}>изчисти</button
      >
    </div>
</div>

<div
  class="bg-[var(--white-color)] border space-y-3  p-5 flex flex-col"
>
    <p class="font-bold uppercase pb-2">Подреди по</p>
  {#each sortFilters as filter}
    <div>
      <input
        class="sr-only peer"
        type="radio"
        name="sorting-filters"
        id={filter.orderBy}
        value={filter.filterString}
        bind:group={$filterSort}
      />
      <label
        class="cursor-pointer text-sm text-black  uppercase peer-checked:font-bold"
        for={filter.orderBy}
      >
        {filter.name}
      </label>
    </div>
  {/each}
</div>


<button
    class="bg-[var(--yellow-color)] w-full text-black py-3 relative uppercase"
    on:click={()=>{drawerStore.close(drawerSettings)}}
>
    Затвори
</button>
