<script lang="ts">
    export let categories:any
</script>

<span class="flex flex-wrap mb-0 md:mb-5">
    <a class="hover:font-bold uppercase text-sm whitespace-nowrap" href="/product?category=">Всички продукти</a> <p class=" uppercase text-sm">&nbsp/&nbsp</p>
    {#each categories as category, i }
        <a class="hover:font-bold uppercase text-sm whitespace-nowrap" href="/product?category={category.id}">{category.name}</a> <p class="uppercase text-sm {categories.length-1 == i ? "hidden" : ""}">&nbsp-&nbsp</p>
    {/each}
</span>
