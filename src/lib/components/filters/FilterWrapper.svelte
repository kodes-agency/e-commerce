<script lang="ts">
  import AllFilter from "./AllFilter.svelte";
  import CategoryFilter from "./CategoryFilter.svelte";
  import EmptyFilter from "./EmptyFilter.svelte";
  import PriceFilter from "./PriceFilter.svelte";
  import { filterProductsString, filterCategory, filterMinMax, filterSort } from "$lib/store/store";
  import SortFilter from "./SortFilter.svelte";
  import { page } from "$app/stores";
  import MobileFilters from "./MobileFilters.svelte";

  $: $filterProductsString = ($filterCategory.length > 0 ? `category=${$filterCategory}&` : "")  
    + ($filterMinMax[0] !== $page.data.filters.price.min ? `min_price=${$filterMinMax[0]*100}&` : "") 
    + ($filterMinMax[1] !== $page.data.filters.price.max ? `max_price=${$filterMinMax[1]*100}&` : "")
    + ($filterSort ? $filterSort : "")
</script>

<div class="hidden w-full md:flex items-center justify-center z-20">
  <div class="w-full flex flex-col space-y-4">
    <CategoryFilter />
    <div class="flex flex-wrap w-full justify-between">
      <AllFilter />
      <EmptyFilter />
      <PriceFilter />
      <SortFilter />
    </div>
  </div>
</div>
<div class="md:hidden fixed bottom-5 right-5">
  <MobileFilters />
</div>
