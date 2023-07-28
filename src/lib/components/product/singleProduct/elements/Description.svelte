<script lang="ts">
  export let longDescription: string;
  export let shortDescription: string;
</script>

<div>
  <p>{@html shortDescription}</p>
  <p>{@html longDescription}</p>
</div>

<style>
</style>
