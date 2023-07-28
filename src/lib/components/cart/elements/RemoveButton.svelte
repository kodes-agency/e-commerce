<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function clickHandler() {
    dispatch("click");
  }
</script>

<button on:click={clickHandler}>
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.7392 5.97128L10.5821 3.12838C10.931 2.77951 10.931 2.21389 10.5821 1.86474L9.95028 1.23292C9.60142 0.884059 9.0358 0.884059 8.68665 1.23292L5.84375 4.07582L3.00085 1.23292C2.65199 0.884059 2.08636 0.884059 1.73722 1.23292L1.1054 1.86474C0.756534 2.2136 0.756534 2.77923 1.1054 3.12838L3.9483 5.97128L1.1054 8.81417C0.756534 9.16304 0.756534 9.72866 1.1054 10.0778L1.73722 10.7096C2.08608 11.0585 2.65199 11.0585 3.00085 10.7096L5.84375 7.86673L8.68665 10.7096C9.03551 11.0585 9.60142 11.0585 9.95028 10.7096L10.5821 10.0778C10.931 9.72895 10.931 9.16332 10.5821 8.81417L7.7392 5.97128Z"
      fill="black"
    />
  </svg>
</button>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    transition: all 0.3s;
  }

  button:hover {
    background: var(--yellow-color);
  }
</style>
