<script lang="ts">
  export let variation: string;
  export let style: string = "";
</script>

{#if !variation}
  <p></p>
{:else}
  <p class={style}>{variation}</p>
{/if}