<script lang="ts">
  import { onMount } from "svelte";

  let scrollBar: HTMLElement;

  function handleScroll() {
    var winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    scrollBar.style.width = scrolled + "%";
  }

  onMount(() => {
    window.onscroll = function () {
      handleScroll();
    };
  });
</script>

<div
  bind:this={scrollBar}
  class="h-1.5 fixed top-0 w-full z-50 gradient"
/>
<div id="fixed-bar" class="bg-black h-1.5 fixed top-0 w-full z-40" />