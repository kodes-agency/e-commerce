<script lang="ts">
    import { filterCategory } from '$lib/store/store'
</script>

<button
    class="border mt-4 lg:m-0 border-[var(--black-color)] text-black w-[250px] py-1 uppercase {$filterCategory.length > 0  ? "bg-[var(--white-color)]" : "bg-[var(--yellow-color)]"}"
    on:click={()=>{$filterCategory = []}}
>
    Всички продукти
</button>