<script lang="ts">
  import { onMount } from "svelte";

  let scrollBar: HTMLElement;

  function handleScroll() {
    var winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = 100 - (winScroll / height) * 100
    scrollBar.style.width = scrolled + "%";
  }

  onMount(() => {
    window.onscroll = function () {
      handleScroll();
    };
  });
</script>


  <div
    class="h-1.5 fixed top-0 w-full z-40 gradient"
  />
  <div bind:this={scrollBar} id="fixed-bar" class="bg-black h-1.5 fixed top-0 right-0 w-full z-50" />
