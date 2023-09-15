<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { filterHeading } from "$lib/store/store";
</script>

<div class="flex flex-wrap w-full justify-between">
  {#each $page.data.categories as category}
    {#if category.name != "Uncategorized"}
      <a
        class="bg-[var(--white-color)] border border-[var(--black-color)] text-black w-[250px] mb-2 text-center py-1 uppercase {category.id ==
        Number($page.url.searchParams.get('category'))
          ? 'bg-[var(--yellow-color)]'
          : 'bg-[var(--white-color)]'}"
        href="?category={category.id}&{$page.url.searchParams.get('min_price')
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
