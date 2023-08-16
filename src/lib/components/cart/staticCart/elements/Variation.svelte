<script lang="ts">
  export let variation: string;
  export let style: string;
</script>

{#if !variation}
  <p class={style}>/</p>
{:else}
  <p class={style}>{variation}</p>
{/if}

<style>
  p {
    font-weight: bold;
    text-align: start;
  }
</style>
