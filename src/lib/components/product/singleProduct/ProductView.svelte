<script lang="ts">
  import Quantity from "./elements/Quantity.svelte";
  import Button from "$lib/components/global/Button.svelte";
  import Gallery from "./elements/Gallery.svelte";
  import Description from "./elements/Description.svelte";
  import Title from "./elements/Title.svelte";
  import Price from "./elements/Price.svelte";
  import ProductVariations from "../global/ProductVariations.svelte";
  import { addItem } from "$lib/functions/cart/item/addCartItem.js";
  import type { Order } from "$lib/types/types";
  import Category from "./elements/Category.svelte";
  import { invalidateAll } from "$app/navigation";
  import ProductGrid from "../featuredGellery/ProductGrid.svelte";
  import { page } from "$app/stores";

  export let product: any;
  export let variations: any

  let order: Order

  $:order = {
    id: product.id,
    name: product.name,
    quantity: 1,
  };

  $: productData = {
    min: 1,
    max: product.add_to_cart.maximum,
  };

  let variationChange: boolean;
</script>

<section class="hidden md:block">
  <Category 
    categories={product.categories}
  />
  <div class="hidden md:flex justify-between space-x-16">
    <div class="flex flex-col w-1/2 space-y-10">
      <div>
        <Title name={product.name} />
  
      </div>
      <Gallery images={product.images} />
    </div>
    <div class="flex flex-col w-1/2 justify-between space-y-5">
      <div class="flex flex-col space-y-20">
        <div class="flex justify-end w-full">
          <Price
            price={product.prices.regular_price}
            salePrice={product.prices.sale_price}
            currency={product.prices.currency_suffix}
            style="italic text-end text-xl"
          />
        </div>
        <Description
          longDescription={product.description}
          shortDescription={product.short_description}
        />
      </div>
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
  
      <div class="flex space-x-2">
        <Quantity
          currentQuantity={order.quantity}
          min={productData.min}
          max={productData.max}
          on:quantityChange={(event) => {
            order.quantity = event.detail.quantity;
          }}
        />
        <Button
          attributes={product.attributes}
          {variationChange}
          type="add-to-cart-button"
          text="Добави в количка"
          on:order={async () => {
            await addItem(order);
            invalidateAll
          }}
        />
      </div>
    </div>
  </div>
  <ProductGrid 
    products={[]}
  />
</section>