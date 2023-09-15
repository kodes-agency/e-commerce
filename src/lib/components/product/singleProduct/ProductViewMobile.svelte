<script lang="ts">
  import Button from "$lib/components/global/Button.svelte";
  import Gallery from "./elements/Gallery.svelte";
  import Description from "./elements/Description.svelte";
  import Title from "./elements/Title.svelte";
  import ProductVariations from "../global/ProductVariationsMobile.svelte";
  import { addItem } from "$lib/functions/cart/item/addCartItem.js";
  import type { Order } from "$lib/types/types";
  import { priceFormat } from "$lib/functions/global/priceFormat";
  import Category from "./elements/Category.svelte";

  export let product: any;
  export let variations: any;


  let order: Order = {
    id: product.id,
    name: product.name,
    quantity: 1,
  };

  let productData = {
    min: 1,
    max: product.add_to_cart.maximum,
  };

  let variationChange: boolean;
</script>

<div class="flex flex-col md:hidden justify-between space-y-5">
  <Category categories={product.categories} />
  <Gallery images={product.images} />
  <Title name={product.name} />
  {#if product.variations.length > 0}
    <ProductVariations
      variations={variations}
      on:variationChange={(event) => {
        order.id = event.detail.id;
        variationChange = event.detail.change;
        productData.max = event.detail.max;
        order.quantity = event.detail.quantity;
      }}
    />
  {/if}
  <Description
    longDescription={product.description}
    shortDescription={product.short_description}
  />
  <Button
    attributes={product.attributes}
    {variationChange}
    type="add-to-cart-button"
    text="Добави в количка ({priceFormat(product.prices.sale_price)}{product.prices.currency_suffix})"
    on:order={async () => {
      await addItem(order);
    }}
  />
</div>
