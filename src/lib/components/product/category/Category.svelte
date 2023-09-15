<script lang="ts">
    export let id: string | number
    export let name: string
    export let src: string
    export let alt: string
</script>
<div class="relative overflow-hidden">
    <a class="relative z-20 peer" href="/product?category={id}">
        <article class="min-h-[150px] md:min-h-[250px] h-[20vh] md:h-[30vh] w-[90vw] md:w-[40vw] lg:w-[30vw] flex items-center justify-center">
            <h2 class="relative text-white text-3xl">{name}</h2>
        </article>
    </a>
    <img loading="lazy" class="peer-hover:scale-100 scale-110 transition-transform duration-500 absolute top-0 left-0 w-full h-full z-10" {src} {alt}>
</div>

<style>

</style>

