<script lang="ts">
  // @ts-ignore
  import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
  import { filterSort } from "$lib/store/store";
  import { page } from "$app/stores";
  import { invalidateAll } from "$app/navigation";

  const minMaxPopup: PopupSettings = {
    event: "click",
    target: "sortFilter",
    placement: "bottom",
    state: (e) => {
      if (e.state) {
        arrowSVG.style.transform = "rotate(0deg)";
        filterButton.style.backgroundColor = "var(--yellow-color)";
      }
      if (!e.state) {
        arrowSVG.style.transform = "rotate(180deg)";
        filterButton.style.backgroundColor = "var(--white-color)";
      }
    },
  };

  let sortFilters = [
    {
      name: "Цена (възходящо)",
      orderBy: "priceAsc",
      order: "asc",
      filterString: "order=asc&orderby=price"
    },
    {
      name: "Цена (низходящо)",
      orderBy: "priceDecs",
      filterString: "order=desc&orderby=price"
    },
    {
      name: "Наскоро добавени",
      orderBy: "date",
      filterString: "order=desc&orderby=date"
    },
    {
      name: "Най-продавани",
      orderBy: "popularity",
      filterString: "order=desc&orderby=popularity"
    },
  ];

  let arrowSVG: any;
  let filterButton: HTMLButtonElement;
</script>

<button
  bind:this={filterButton}
  class="mt-4 lg:m-0 bg-[var(--white-color)] border border-[var(--black-color)] text-black w-[250px] py-1 relative uppercase"
  use:popup={minMaxPopup}
>
  Подреди по
  <svg
    bind:this={arrowSVG}
    class="absolute right-5 top-2.5 rotate-180 transition-transform duration-300"
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512">
    <style>
      svg {
        fill: #222221;
      }
    </style><path
      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
    /></svg
  >
</button>
<div data-popup="sortFilter" class="z-20">
  <div
    class="bg-[var(--white-color)] w-[250px] border border-[var(--gray-color)] space-y-5 py-10 p-5 flex flex-col"
  >
    {#each sortFilters as filter}
      <a 
        class="text-cente uppercase {filter.filterString == ("order="+$page.url.searchParams.get("order")+"&orderby="+$page.url.searchParams.get("orderby")) ? 'font-bold' : ''}"
        href="?{$page.url.searchParams.get("category") ? "category="+$page.url.searchParams.get("category")+"&" : ""}{$page.url.searchParams.get("min_price") ? `min_price=${$page.url.searchParams.get("min_price")}&` : ""}{$page.url.searchParams.get("max_price") ? `max_price=${$page.url.searchParams.get("max_price")}&` : ""}{filter.filterString}"
        on:click={invalidateAll}
      >
        {filter.name}
      </a>
    {/each}
  </div>
</div>
