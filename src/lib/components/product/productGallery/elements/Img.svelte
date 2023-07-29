<script lang="ts">
  export let src: string;
  export let sizes: string;
  export let alt: string;
  export let style: string;
</script>

<img {src} {alt} {sizes} class={style}/>