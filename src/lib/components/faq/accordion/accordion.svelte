<script lang="ts">
	import { setAccordionOptions } from './context'

	// by default more than one accordion can be open
	export let collapse = false

	// the context API avoids passing data through components as props
	setAccordionOptions({ collapse })
</script>

<div class="accordion flex flex-col space-y-5">
	<slot />
</div>

<style>
	.accordion {
		max-width: var(--accordion-width, 100%);
		color: var(--accordion-color, var(--white-color));
		background-color: var(--accordion-background, transparent);
		border-radius: var(--accordion-radius, );
		box-shadow: var(--accordion-shadow, );
	}
</style>
