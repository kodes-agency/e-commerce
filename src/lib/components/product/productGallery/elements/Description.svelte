<script lang="ts">
  export let shortDescription: string;
  export let style: string;
</script>

<p class={style}>{@html shortDescription}</p>
