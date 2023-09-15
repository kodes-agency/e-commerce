<script lang="ts">
    import ProductView from "$lib/components/product/singleProduct/ProductView.svelte";
    import ProductViewMobile from "$lib/components/product/singleProduct/ProductViewMobile.svelte";

    export let data    
</script>

<section class="p-5 pt-20 md:p-10 md:pt-32 lg:px-[10vw] lg:py-[20vh]">
    <ProductView 
        product={data.product}
        variations={data.variations}
    />
    <ProductViewMobile 
        product={data.product}
        variations={data.variations}
    />
</section>