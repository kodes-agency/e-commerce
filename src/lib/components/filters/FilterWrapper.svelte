<script lang="ts">
  import AllFilter from "./AllFilter.svelte";
  import CategoryFilter from "./CategoryFilter.svelte";
  import EmptyFilter from "./EmptyFilter.svelte";
  import PriceFilter from "./PriceFilter.svelte";
  import SortFilter from "./SortFilter.svelte";
  import MobileFilters from "./MobileFilters.svelte";
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
<div class="md:hidden fixed bottom-5 z-20 right-5">
  <MobileFilters />
</div>
