<script lang="ts">
  //@ts-expect-error
  import RangeSlider from "svelte-range-slider-pips";
  import { filterMinMax, filterHeading } from "$lib/store/store";
  import { page } from "$app/stores";
  import { drawerStore } from "@skeletonlabs/skeleton";
  import type { DrawerSettings } from "@skeletonlabs/skeleton";
  import { goto, invalidateAll } from "$app/navigation";

  const drawerSettings: DrawerSettings = {
    id: "filterDrawer",
  };

  let min = $page.data.filters.price.min;
  let max = $page.data.filters.price.max;

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
    <a
      class="text-black uppercase {$page.url.searchParams.get('category')
        ? 'font-normal'
        : 'font-bold'}"
      href="/product?category=&{$page.url.searchParams.get('min_price')
        ? `min_price=${$page.url.searchParams.get('min_price')}&`
        : ''}{$page.url.searchParams.get('max_price')
        ? `max_price=${$page.url.searchParams.get('max_price')}&`
        : ''}{$page.url.searchParams.get('order')
        ? `order=${$page.url.searchParams.get('order')}&`
        : ''}{$page.url.searchParams.get('orderby')
        ? `orderby=${$page.url.searchParams.get('orderby')}`
        : ''}"
      on:click={invalidateAll}
    >
      Всички продукти
    </a>
    {#each $page.data.categories as category}
      {#if category.name != "Uncategorized"}
        <a
          class="bg-[var(--white-color)] text-black uppercase {category.id ==
          Number($page.url.searchParams.get('category'))
            ? 'font-bold'
            : 'font-normal'}"
          href="/product?category={category.id}&{$page.url.searchParams.get('min_price')
            ? `min_price=${$page.url.searchParams.get('min_price')}&`
            : ''}{$page.url.searchParams.get('max_price')
            ? `max_price=${$page.url.searchParams.get('max_price')}&`
            : ''}{$page.url.searchParams.get('order')
            ? `order=${$page.url.searchParams.get('order')}&`
            : ''}{$page.url.searchParams.get('orderby')
            ? `orderby=${$page.url.searchParams.get('orderby')}`
            : ''}"
          on:click={() => {
            $filterHeading = category.name;
            invalidateAll;
          }}
        >
          {category.name}
        </a>
      {/if}
    {/each}
  </div>
</div>
<div class="bg-[var(--white-color)] border p-5">
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
      on:stop={() => {
        goto(
          `/product?${
            $page.url.searchParams.get("category")
              ? "category=" + $page.url.searchParams.get("category") + "&"
              : ""
          }min_price=${$filterMinMax[0] * 100}&max_price=${
            $filterMinMax[1] * 100 + "&"
          }${
            $page.url.searchParams.get("order")
              ? "order=" + $page.url.searchParams.get("order") + "&"
              : ""
          }${
            $page.url.searchParams.get("orderby")
              ? "orderby=" + $page.url.searchParams.get("orderby")
              : ""
          }`
        );
        invalidateAll;
      }}
    />
    <div class="flex justify-between px-6 items-center pt-7">
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
        goto(
          `/product?${
            $page.url.searchParams.get("category")
              ? "category=" + $page.url.searchParams.get("category") + "&"
              : ""
          }${
            $page.url.searchParams.get("order")
              ? "order=" + $page.url.searchParams.get("order") + "&"
              : ""
          }${
            $page.url.searchParams.get("orderby")
              ? "orderby=" + $page.url.searchParams.get("orderby")
              : ""
          }`
        );
      }}>изчисти</button
    >
  </div>
</div>

<div class="bg-[var(--white-color)] border space-y-3 p-5 flex flex-col">
  <p class="font-bold uppercase pb-2">Подреди по</p>
  {#each sortFilters as filter}
    <a
      class="text-cente uppercase {filter.filterString ==
      'order=' +
        $page.url.searchParams.get('order') +
        '&orderby=' +
        $page.url.searchParams.get('orderby')
        ? 'font-bold'
        : ''}"
      href="?{$page.url.searchParams.get('category')
        ? 'category=' + $page.url.searchParams.get('category') + '&'
        : ''}{$page.url.searchParams.get('min_price')
        ? `min_price=${$page.url.searchParams.get('min_price')}&`
        : ''}{$page.url.searchParams.get('max_price')
        ? `max_price=${$page.url.searchParams.get('max_price')}&`
        : ''}{filter.filterString}"
      on:click={invalidateAll}
    >
      {filter.name}
    </a>
  {/each}
</div>

<button
  class="bg-[var(--yellow-color)] w-full text-black py-3 relative uppercase"
  on:click={() => {
    drawerStore.close();
  }}
>
  Затвори
</button>
