<script lang="ts">
  export let name: string;
  export let style: string = "";
</script>

<p class={style}>{@html name}</p>
