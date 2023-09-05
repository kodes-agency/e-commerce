<script lang="ts">
    import Stripe from "./stripe/Stripe.svelte";
</script>

<section class="relative">
    <div class="bg-white h-96 w-96 rounded-md flex flex-col items-center justify-center">
        <h1>
            Secure card payment with STRIPE
        </h1>
        <Stripe />
    </div>
</section>


<style>

</style>