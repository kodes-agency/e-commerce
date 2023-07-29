<script lang="ts">
  export let name: string;
  export let style: string;
</script>

<p class={style}>{name}</p>

<style>
  /* p {
    font-size: 12px;
    font-weight: 800;
    max-width: 22ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } */
</style>
