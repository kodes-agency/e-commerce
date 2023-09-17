<script lang="ts">
	import { slide } from 'svelte/transition'
	import { getAccordionOptions } from './context'
	import { v4 as uuidv4 } from 'uuid';


	// by default the accordion item is closed
	export let open = false

	// assign a unique identifier for the component
	const componentId = uuidv4()

	// get the accordion options using the context api
	const { collapse, activeComponentId } = getAccordionOptions()

	function setActive() {
		// update the store value in the context
		$activeComponentId = componentId
	}

	function toggleOpen() {
		open = !open
	}

	function handleClick() {
		// if `collapse` is passed only one item can be active
		collapse ? setActive() : toggleOpen()
	}

	// the accordion item to be open by default
	$: open && collapse && setActive()
	// compare if the active id matches the component id
	$: isActive = $activeComponentId === componentId
	// if `collapse`, set one item as active, otherwise use `open`
	$: isOpen = collapse ? isActive : open
</script>

<div class="accordion-item">
	<button
		on:click={handleClick}
		class="accordion-toggle"
		aria-expanded={isOpen}
		aria-controls="accordion-{componentId}"
	>
		<div class="accordion-title {isOpen ? "isOpen" : ""}">
			<slot name="title"/>
		</div>
	</button>

	{#if isOpen}
		<!-- local transitions only play when the block they belong to is created or destroyed -->
		<div
			transition:slide|local
			class="accordion-content isOpen"
			role="region"
			aria-hidden={!isOpen}
			data-active={isOpen}
			aria-labelledby="accordion-{componentId}"
		>
			<slot name="content"/>
		</div>
	{/if}
</div>

<style lang="postcss">
	.accordion-toggle {
		display: flex;
		justify-content: space-between;
		color: var(--accordion-color, inherit);
		font: inherit;
		border: none;
		background: none;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	:global(.isOpen h2){
		color: var(--text-color, var(--cyan-color));
	}
</style>
