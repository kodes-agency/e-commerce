<script lang="ts">
    import { page } from "$app/stores";
</script>

<section class=" h-screen w-full flex flex-col justify-center items-center">
    <div class=" w-96 p-5 bg-white rounded-md h-96 flex flex-col space-y-3">
        <h2>Dear {$page.url.searchParams.get("first_name")+" "}{$page.url.searchParams.get("last_name")},</h2>
        <h2 class="pb-3">Your order with ID:{$page.url.searchParams.get("order_id")} has successfully processed!</h2>
        <p>Shortly, you will recieve a confirmation message send to: {$page.url.searchParams.get("email")}</p>
        <p>Thank you for choosing FRAGMENT.bg</p>
    </div>
</section>