<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let min: number;
  export let max: number;
  export let currentQuantity: number;
  // export let variationChange: boolean;

  const dispatch = createEventDispatcher();

  function adjustQuantity(
    action: "increase" | "decrease",
    min: number,
    max: number
  ) {
    if (action == "increase" && currentQuantity + 1 <= max) {
      currentQuantity++;
      dispatch("quantityChange", {
        quantity: currentQuantity,
      });
    }
    if (action == "decrease" && currentQuantity - 1 >= min) {
      currentQuantity--;
      dispatch("quantityChange", {
        quantity: currentQuantity,
      });
    }
    return null;
  }
</script>

<div class="flex items-center border border-black h-10">
  <p class="h-10 w-10 flex justify-center items-center">{currentQuantity}</p>
  <div
    class="border-l border-black h-full w-8 flex flex-col justify-around items-center"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      id="increase"
      class="flex items-center justify-center w-full h-full hover:bg-amber-300"
      disabled={max == currentQuantity}
      on:click={adjustQuantity("increase", min, max)}
    >
      <svg
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.38862 0.160959L9.83902 4.61136C10.0537 4.826 10.0537 5.17398 9.83902 5.3886L9.31995 5.90767C9.10568 6.12194 8.75841 6.12235 8.54363 5.90858L4.99999 2.38157L1.45637 5.90861C1.24159 6.12238 0.89432 6.12196 0.680047 5.90769L0.160979 5.38862C-0.0536598 5.17398 -0.0536598 4.826 0.160979 4.61138L4.61138 0.160982C4.826 -0.053657 5.17398 -0.0536568 5.38862 0.160959Z"
          fill="black"
        />
      </svg>
    </button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      id="decrease"
      class="flex items-center justify-center border-t border-black w-full h-full hover:bg-amber-300"
      disabled={min == currentQuantity}
      on:click={adjustQuantity("decrease", min, max)}
    >
      <svg
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.72466 6.74746L0.274261 2.29703C0.0596215 2.08239 0.0596215 1.73441 0.274261 1.51979L0.793329 1.00073C1.0076 0.786454 1.35488 0.786041 1.56965 0.99981L5.11329 4.52685L8.65691 0.99981C8.87169 0.786041 9.21896 0.786454 9.43323 1.00073L9.9523 1.51979C10.1669 1.73443 10.1669 2.08242 9.9523 2.29703L5.50192 6.74746C5.28728 6.96207 4.9393 6.96207 4.72466 6.74746Z"
          fill="black"
        />
      </svg>
    </button>
  </div>
</div>
