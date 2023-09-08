<script lang="ts">
  import AllFilter from "./AllFilter.svelte";
  import CategoryFilter from "./CategoryFilter.svelte";
  import EmptyFilter from "./EmptyFilter.svelte";
  import PriceFilter from "./PriceFilter.svelte";
  import { filterProductsString, filterCategory, filterMinMax, filterSort } from "$lib/store/store";
  import SortFilter from "./SortFilter.svelte";
  import { page } from "$app/stores";

  $: $filterProductsString = ($filterCategory.length > 0 ? `category=${$filterCategory}&` : "")  
    + ($filterMinMax[0] !== $page.data.filters.price.min ? `min_price=${$filterMinMax[0]*100}&` : "") 
    + ($filterMinMax[1] !== $page.data.filters.price.max ? `max_price=${$filterMinMax[1]*100}&` : "")
    + ($filterSort ? $filterSort : "")
</script>


<div class="my-32 mx-20 p-10 bg-yellow rounded-md flex flex-col space-y-6">
  <p>{$filterProductsString}</p>
  <CategoryFilter />
  <div class="flex w-full justify-between">
    <AllFilter />
    <EmptyFilter />
    <SortFilter />
    <PriceFilter />
  </div>
</div>
