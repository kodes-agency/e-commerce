<script lang="ts">
  export let images: { src: string; alt: string }[] = [];
  let largeImage: HTMLImageElement;
</script>

<div class="image-gallery">
  <div class="large-image">
    <img src={images[0].src} alt={images[0].alt} bind:this={largeImage} />
  </div>
  <div class="small-images">
    {#each images as image}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
        class="small-images"
        src={image.src}
        alt={image.alt}
        on:click={() => (largeImage.src = image.src)}
        style="{image?.src == largeImage?.src ? 'opacity: 1' : 'opacity: 0.7'};"
      />
    {/each}
  </div>
</div>

<style>
  img {
    border: 1px solid black;
  }

  .small-images img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    display: block;
    cursor: pointer;
    margin: 0 0 10px 10px;
    transition: all 0.3s;
  }

  .small-images img:hover {
    opacity: 1 !important;
  }

  .large-image img {
    max-width: 420px;
    height: 100%;
    object-fit: cover;
  }

  .image-gallery {
    display: flex;
    flex-direction: row;
  }
</style>
