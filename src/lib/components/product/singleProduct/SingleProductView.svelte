<script lang="ts">
  import Quantity from "$lib/components/cart/elements/Quantity.svelte";
  import Button from "$lib/components/global/Button.svelte";
  import Gallery from "./elements/Gallery.svelte";
  import Description from "./elements/Description.svelte";
  import Title from "./elements/Title.svelte";
  import Price from "./elements/Price.svelte";
  import ProductVariations from "../global/ProductVariations.svelte";
  import { toastStore } from "@skeletonlabs/skeleton";
  import { addItem } from "$lib/functions/cart/item/addCartItem.js";
  import type { Order } from "$lib/types/types";

  export let data: any;

  const { product } = data.props;

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

<Title name={product.name} />
<Price
  regular_price={product.prices.regular_price}
  sale_price={product.prices.sale_price}
  currency_suffix={product.prices.currency_suffix}
  currency_prefix={product.prices.currency_prefix}
  currency_code={product.prices.currency_code}
  language="en"
/>
<Gallery images={product.images} />

<Description
  longDescription={product.description}
  shortDescription={product.short_description}
/>
{#if product.variations.length > 0}
  <ProductVariations
    attributes={product.attributes}
    variations={product.variations}
    text="Choose"
    on:variationChange={(event) => {
      order.id = event.detail.id;
      variationChange = event.detail.change;
      productData.max = event.detail.max;
      order.quantity = event.detail.quantity;
    }}
  />
{/if}

<Quantity
  currentQuantity={order.quantity}
  min={productData.min}
  max={productData.max}
  minHeight="26px"
  minWidth="26px"
  buttonHeight="13px"
  buttonWidth="20px"
  on:quantityChange={(event) => {
    order.quantity = event.detail.quantity;
  }}

/>
<Button
  attributes={product.attributes}
  {variationChange}
  type="add-to-cart-button"
  text="Add to cart"
  on:order={async () => {
    await addItem(order, toastStore);
  }}
/>
