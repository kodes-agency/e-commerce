<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let style: string;
  const dispatch = createEventDispatcher();

  function clickHandler() {
    dispatch("click");
  }
</script>

<button 
  on:click={(event)=>{
    event.preventDefault()
    clickHandler()
  }} 
  class={style} type="button">
  <slot></slot>
</button>
