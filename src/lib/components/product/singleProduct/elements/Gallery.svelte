<script lang="ts">
  export let images: { src: string; alt: string }[] = [];
  let largeImage: HTMLImageElement;
</script>

<div class="flex flex-col lg:flex-row lg:shrink-0 lg:max-h-[30vw]">
  <div class="large-image border border-[var(--black-color)]">
    <img
      class="mix-blend-multiply object-contain aspect-square lg:h-[29.5vw] w-full lg:w-auto"
      src={images[0].src}
      alt={images[0].alt}
      bind:this={largeImage}
    />
  </div>
  <div class="small-images flex lg:flex-col lg:shrink-0 overflow-x-scroll overflow-y-hidden lg:overflow-y-scroll lg:overflow-x-hidden hide-scrollbar">
    {#each images as image}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
        class="w-16 h-16 lg:w-20 lg:h-20 object-contain aspect-square cursor-pointer mt-2 mr-2 lg:mt-0 lg:mr-0 lg:mb-2 lg:ml-2 transition-all mix-blend-multiply border border-[var(--black-color)]"
        src={image.src}
        alt={image.alt}
        on:click={() => (largeImage.src = image.src)}
        style="{image?.src == largeImage?.src ? 'opacity: 1' : 'opacity: 0.7'};"
      />
    {/each}
  </div>
</div>

<style>
  .small-images img:hover {
    opacity: 1 !important;
  }
</style>
