<script lang="ts">
  import Accordion from "$lib/components/faq/accordion/accordion.svelte";
  import AccordionItem from "$lib/components/faq/accordion/accordion-item.svelte";
  export let data;
  $: pageData = data.data.faqPage.data.attributes;
</script>

<section
  class="w-full flex flex-col py-32 md:py-40 items-center justify-center space-y-10 md:space-y-16"
>
  <h1 class="text-3xl md:text-5xl font-bold text-center">{pageData.pageHeading}</h1>
  <div class="flex flex-col space-y-6 md:space-y-10 w-[90vw] md:w-[80vw] lg:w-[60vw]">
    {#each pageData.faqSegment as segment}
      <h2 class="text-2xl md:text-3xl uppercase font-medium text-center">
        {segment.faqSegmentHeading}
      </h2>
      <Accordion
        collapse
      >
        {#each segment.faqItem as item}
          <AccordionItem>
            <svelte:fragment slot="title">
              <div class="bg-[var(--cyan-color)] px-6 py-2 mb-4 w-[90vw] md:w-[80vw] lg:w-[60vw] border">
                <h3
                  class="text-[var(--black-color)] font-medium text-start text-base md:text-xl uppercase transition-all duration-700 "
                >
                  {item.faqTitle}
                </h3>
              </div>
            </svelte:fragment>
            <svelte:fragment slot="content">
              <p class="text-[var(--black-color)] text-base md:text-xl px-2 md:px-4 ">
                {item.faqParagraph}
              </p>
            </svelte:fragment>
          </AccordionItem>
        {/each}
      </Accordion>
    {/each}
  </div>
</section>
