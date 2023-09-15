<script lang="ts">
  import { invalidateAll } from '$app/navigation';
    import { filterCategory } from '$lib/store/store'
    import { page } from '$app/stores';
</script>

<a
    class="border mt-4 lg:m-0 border-[var(--black-color)] text-center text-black w-[250px] py-1 uppercase {$page.url.searchParams.get("category")  ? "bg-[var(--white-color)]" : "bg-[var(--yellow-color)]"}"
    href="?category=&{$page.url.searchParams.get("min_price") ? `min_price=${$page.url.searchParams.get("min_price")}&` : ""}{$page.url.searchParams.get("max_price") ? `max_price=${$page.url.searchParams.get("max_price")}&` : ""}{$page.url.searchParams.get("order") ? `order=${$page.url.searchParams.get("order")}&` : ""}{$page.url.searchParams.get("orderby") ? `orderby=${$page.url.searchParams.get("orderby")}` : ""}"
    on:click={invalidateAll}
>
    Всички продукти
</a>