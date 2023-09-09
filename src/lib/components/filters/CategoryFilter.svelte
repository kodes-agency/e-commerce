<script lang="ts">
  import { filterCategory } from "$lib/store/store";

  let categories = [
    {
      name: "Мода",
      slug: "fashion",
      id: 19
    },
    {
      name: "Бижута и аксесоари",
      slug: "jewelry",
      id: 21
    },
    {
      name: "За дома",
      slug: "home",
      id: 22
    },
    {
      name: "Храна и напитки",
      slug: "foods",
      id: 20
    },
  ];
</script>

<div class="flex flex-wrap w-full justify-between">
  {#each categories as category}
    <div class="mb-4">
      <input
        class="sr-only peer"
        type="checkbox"
        name={category.slug}
        id={category.slug}
        value={category.id}
        bind:group={$filterCategory}
      />
      <label
        class="cursor-pointer bg-[var(--white-color)] border border-[var(--black-color)] text-black w-[250px] text-center py-1 uppercase peer-checked:bg-[var(--yellow-color)]"
        for={category.slug}
      >
        {category.name}
      </label>
    </div>
  {/each}
</div>

<style>
</style>
