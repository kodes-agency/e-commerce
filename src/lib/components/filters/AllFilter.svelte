<script lang="ts">
  import { filterCategory } from "$lib/store/store";
</script>

<button
    on:click={()=>{
        $filterCategory = []
    }}
  type="button"
  aria-label="product filter - all products"
  class="border border-[var(--black-color)] text-black w-[250px] py-1 uppercase {$filterCategory.length == 0
    ? 'bg-[var(--yellow-color)]'
    : 'bg-[var(--white-color)]'}"
>
  Всички продукти
</button>
