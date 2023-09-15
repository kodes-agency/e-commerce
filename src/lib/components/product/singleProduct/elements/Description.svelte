<script lang="ts">
  export let longDescription: string;
  export let shortDescription: string;
</script>

<div class="description">
  {#if shortDescription.length > 0}
    <p>{@html shortDescription}</p>
  {/if}
  {#if longDescription}
    <p>{@html longDescription}</p>
  {/if}
</div>

<style>
  :global(.description li) {
    list-style:inside;
    padding-left: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
</style>

