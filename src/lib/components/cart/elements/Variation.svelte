<script lang="ts">
  export let variation: string;
</script>

{#if !variation}
  <p>/</p>
{:else}
  <p>{variation}</p>
{/if}

<style>
  p {
    font-weight: bold;
    text-align: start;
  }
</style>
