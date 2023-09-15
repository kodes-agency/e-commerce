<script lang="ts">
  import FilterWrapper from "$lib/components/filters/FilterWrapper.svelte";
  import ProductGrid from "$lib/components/product/productGallery/ProductGrid.svelte";
  import { filterHeading, filterMinMax } from "$lib/store/store";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  export let data;


  function currentCategory(){
    let heading
    $page.data.categories.forEach((category:any) => {
      if(category.id === Number($page.url.searchParams.get("category"))){
        heading = category.name
      }
    });
    return heading
  }

  $: $filterHeading = currentCategory()
</script>

<section
  class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8 lg:py-32"
>
  <FilterWrapper />
  <section class="flex flex-col items-center">
  {#if data.products.length == 0}
    <div class="w-full flex justify-center items-center">
      <svg width="158" height="152" class="w-24" viewBox="0 0 158 152" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_43_93)">
        <path d="M10.937 6.09863H151.853V145.901H10.937V6.09863Z" fill="#EECC4D"/>
        <path d="M7.8636 0H154.926C156.624 0 158 1.36514 158 3.04929V148.951C158 150.635 156.624 152 154.926 152H7.8636C6.16605 152 4.79004 150.635 4.79004 148.951V3.04929C4.79004 1.36514 6.16605 0 7.8636 0ZM10.9372 145.901H151.853V6.09858H10.9372V145.901Z" fill="#181818"/>
        <path d="M54.4257 108.236H84.1447C85.8423 108.236 87.2183 109.601 87.2183 111.285C87.2183 112.969 85.8423 114.334 84.1447 114.334H54.4257C52.7282 114.334 51.3522 112.969 51.3522 111.285C51.3522 109.601 52.7282 108.236 54.4257 108.236Z" fill="#181818"/>
        <path d="M33.1946 48.2114C48.1037 48.2114 60.2372 60.2444 60.2419 75.0358C60.2419 75.0499 60.2419 75.0686 60.2419 75.0827C60.2136 89.86 48.0896 101.865 33.1946 101.865C18.2996 101.865 6.15198 89.8319 6.14725 75.0405C6.14725 75.0405 6.14725 75.003 6.14725 74.9889C6.17562 60.2162 18.2996 48.2114 33.1946 48.2114Z" fill="white"/>
        <path d="M0.00485992 74.9888C0.0332336 56.8573 14.914 42.1128 33.1993 42.1128C51.4847 42.1128 66.3843 56.8807 66.3938 75.0404C66.3938 75.0592 66.3938 75.078 66.3938 75.0967C66.3607 93.2236 51.4799 107.968 33.1993 107.968C14.9187 107.968 0.0143204 93.2001 0.00485992 75.0498V75.0404C0.00485992 75.0404 0.00485992 75.0123 0.00485992 74.9982V74.9888ZM6.15199 75.0357C6.15671 89.8318 18.2902 101.865 33.1993 101.865C48.1085 101.865 60.2183 89.8553 60.2467 75.0826C60.2467 75.0686 60.2467 75.0498 60.2467 75.0357C60.2419 60.2443 48.1085 48.2114 33.1993 48.2114C18.2902 48.2114 6.18036 60.2209 6.15199 74.9888C6.15199 75.0029 6.15199 75.0217 6.15199 75.0357Z" fill="#181818"/>
        <path d="M104.534 48.2114C119.443 48.2114 131.577 60.2444 131.582 75.0358C131.577 89.8366 119.443 101.87 104.534 101.87C89.6251 101.87 77.4916 89.8366 77.4868 75.0452C77.4868 75.0452 77.4868 75.0076 77.4868 74.9936C77.5152 60.2209 89.6392 48.2161 104.534 48.2161V48.2114Z" fill="white"/>
        <path d="M71.3398 74.9888C71.3682 56.8573 86.249 42.1128 104.534 42.1128C122.82 42.1128 137.719 56.8807 137.729 75.0451C137.724 93.1954 122.829 107.963 104.534 107.963C86.2395 107.963 71.3493 93.1954 71.3398 75.0451V75.0357C71.3398 75.0357 71.3398 75.0076 71.3398 74.9935V74.9888ZM77.4869 75.0357C77.4917 89.8318 89.6252 101.865 104.534 101.865C119.443 101.865 131.577 89.8318 131.582 75.031C131.577 60.2396 119.443 48.2067 104.534 48.2067C89.6252 48.2067 77.5153 60.2162 77.4869 74.9841C77.4869 74.9982 77.4869 75.017 77.4869 75.031V75.0357Z" fill="#181818"/>
        <path d="M91.0767 75.0408C83.6444 75.0408 77.6192 69.0632 77.6192 61.6896C77.6192 54.3159 83.6444 48.3384 91.0767 48.3384C98.5091 48.3384 104.534 54.3159 104.534 61.6896C104.534 69.0632 98.5091 75.0408 91.0767 75.0408Z" fill="#222221"/>
        <path d="M19.7417 75.0408C12.3094 75.0408 6.28427 69.0632 6.28427 61.6896C6.28427 54.3159 12.3094 48.3384 19.7417 48.3384C27.1741 48.3384 33.1992 54.3159 33.1992 61.6896C33.1992 69.0632 27.1741 75.0408 19.7417 75.0408Z" fill="#222221"/>
        </g>
        <defs>
        <clipPath id="clip0_43_93">
        <rect width="158" height="152" fill="white" transform="matrix(-1 0 0 1 158 0)"/>
        </clipPath>
        </defs>
      </svg>
    </div>
      <h1 class="text-xl font-bold md:text-4xl md:mb-5">
        Уууупс...
      </h1>
      <p class="text-xl mb-5 md:text-2xl max-w-xl md:text-center">
        За съжаление зададените филтри не отговарят на нито един от нашите
        продукти.
      </p>
      <a
      class="uppercase font-bold border border-[var(--black-color)] py-1 px-5"
      href="?category=&{$page.url.searchParams.get("order") ? `order=${$page.url.searchParams.get("order")}&` : ""}{$page.url.searchParams.get("orderby") ? `orderby=${$page.url.searchParams.get("orderby")}` : ""}"
      on:click={()=>{
        $filterMinMax = [0,100000,0,100]
        invalidateAll
      }}
      >
          Всички продукти
      </a>
      {:else}
        {#if $page.url.searchParams.get("category")}
          <h1 class="text-4xl md:text-6xl font-bold my-5 md:my-10 w-full md:text-center">
            {$filterHeading}
          </h1>
        {:else}
          <h1 class="text-4xl md:text-6xl font-bold my-5 md:my-10 w-full md:text-center">Всички продукти</h1>
        {/if}
    {/if}
  </section>

  <ProductGrid products={data.products} />
</section>
