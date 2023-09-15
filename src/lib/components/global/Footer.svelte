<script lang="ts">
  import { subscribe } from "$lib/stores/store.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let subscriptonWrapper;
  let user_email: string;
  let links: any;

  let langParam:string
  
  if($page.params.lang == "en" || $page.params.lang == "bg"){
    langParam = $page.params.lang+"/"
  } else {
    langParam = ""
  }

  

  async function userSubscribe() {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: user_email,
        subscribe: true,
      }),
    });
    $subscribe = true;
  }

  function linkEnterAnimation(event: any) {
    links.forEach((link: { style: { opacity: string } }) => {
      link.style.opacity = "0.5";
      event.target.style.opacity = "1";
      event.target.style.transform = "scale(1.1)";
    });
  }

  function linkLeaveAnimation(event: any) {
    links.forEach((link: { style: { opacity: string, transform: string } }) => {
      link.style.opacity = "1";
      link.style.transform = "scale(1)";
    });
  }

  onMount(() => {
    links = document.querySelectorAll(".footer-links");
    links.forEach(
      (link: {
        addEventListener: (
          arg0: string,
          arg1: { (event: any): void; (event: any): void }
        ) => void;
      }) => {
        link.addEventListener("mouseenter", linkEnterAnimation);
        link.addEventListener("mouseleave", linkLeaveAnimation);
      }
    );
  });
</script>

<footer class="bg-white px-10 pt-20 pb-4">
  <section
    class="flex flex-col md:flex-row space-y-8 md:space-y-0 justify-between"
  >
    <div class="flex flex-col items-center md:items-start space-y-4">
      {#each $page.data.layoutData?.data?.menu?.data?.attributes?.menuItems as item } 
        <a
          class="footer-links transition-all text-black text-xl"
          href="{$page.params.lang ? "/"+$page.params.lang : ""}{item?.link}"
          data-sveltekit-preload-data="tap">{item?.menuItem}</a
        >
      {/each}
    </div>
    <div
      class="flex flex-col items-center space-y-8 md:space-y-4 md:items-end justify-between"
    >
      <div class="flex space-x-6">
        <a class="footer-links transition-all" aria-label="linkedin" target="_blank" href={$page.data.layoutData?.data?.menu?.data?.attributes?.linkedinLink}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.47689 20H0.330365V6.64702H4.47689V20ZM2.40139 4.82555C1.07547 4.82555 0 3.72732 0 2.40139C9.49038e-09 1.7645 0.253003 1.1537 0.703352 0.703352C1.1537 0.253003 1.7645 0 2.40139 0C3.03828 0 3.64909 0.253003 4.09943 0.703352C4.54978 1.1537 4.80279 1.7645 4.80279 2.40139C4.80279 3.72732 3.72687 4.82555 2.40139 4.82555ZM19.996 20H15.8584V13.4999C15.8584 11.9507 15.8271 9.96406 13.7025 9.96406C11.5467 9.96406 11.2163 11.6471 11.2163 13.3882V20H7.07427V6.64702H11.0511V8.46849H11.1092C11.6628 7.41936 13.015 6.31219 15.0325 6.31219C19.229 6.31219 20.0004 9.07565 20.0004 12.665V20H19.996Z"
              fill="black"
            />
          </svg>
        </a>
        <a class="footer-links transition-all" aria-label="instagram" target="_blank" href={$page.data.layoutData?.data?.menu?.data?.attributes?.instagramLink}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7862 4.87225C7.94787 4.87225 5.65845 7.16166 5.65845 10C5.65845 12.8383 7.94787 15.1277 10.7862 15.1277C13.6245 15.1277 15.9139 12.8383 15.9139 10C15.9139 7.16166 13.6245 4.87225 10.7862 4.87225ZM10.7862 13.3337C8.95199 13.3337 7.4525 11.8387 7.4525 10C7.4525 8.16133 8.94753 6.66629 10.7862 6.66629C12.6249 6.66629 14.1199 8.16133 14.1199 10C14.1199 11.8387 12.6204 13.3337 10.7862 13.3337ZM17.3197 4.6625C17.3197 5.32746 16.7842 5.85853 16.1237 5.85853C15.4587 5.85853 14.9277 5.32299 14.9277 4.6625C14.9277 4.00201 15.4632 3.46647 16.1237 3.46647C16.7842 3.46647 17.3197 4.00201 17.3197 4.6625ZM20.7159 5.87638C20.64 4.27424 20.2741 2.85507 19.1004 1.68582C17.9311 0.516568 16.512 0.150619 14.9098 0.070289C13.2586 -0.0234297 8.30935 -0.0234297 6.65812 0.070289C5.06044 0.146156 3.64127 0.512105 2.46756 1.68136C1.29384 2.85061 0.932357 4.26978 0.852027 5.87192C0.758309 7.52315 0.758309 12.4724 0.852027 14.1236C0.927895 15.7258 1.29384 17.1449 2.46756 18.3142C3.64127 19.4834 5.05598 19.8494 6.65812 19.9297C8.30935 20.0234 13.2586 20.0234 14.9098 19.9297C16.512 19.8538 17.9311 19.4879 19.1004 18.3142C20.2696 17.1449 20.6356 15.7258 20.7159 14.1236C20.8096 12.4724 20.8096 7.52761 20.7159 5.87638ZM18.5827 15.8953C18.2346 16.7701 17.5607 17.4439 16.6816 17.7965C15.365 18.3186 12.2411 18.1981 10.7862 18.1981C9.33133 18.1981 6.20291 18.3142 4.89085 17.7965C4.01615 17.4484 3.34227 16.7745 2.9897 15.8953C2.46756 14.5788 2.58805 11.4549 2.58805 10C2.58805 8.54513 2.47202 5.41671 2.9897 4.10465C3.3378 3.22995 4.01168 2.55606 4.89085 2.2035C6.20738 1.68136 9.33133 1.80185 10.7862 1.80185C12.2411 1.80185 15.3695 1.68582 16.6816 2.2035C17.5563 2.5516 18.2301 3.22548 18.5827 4.10465C19.1048 5.42118 18.9843 8.54513 18.9843 10C18.9843 11.4549 19.1048 14.5833 18.5827 15.8953Z"
              fill="black"
            />
          </svg>
        </a>
        <a class="footer-links transition-all" aria-label="facebook" target="_blank" href={$page.data.layoutData?.data?.menu?.data?.attributes?.facebookLink}>
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7971 11.25L11.3526 7.63047H7.87954V5.28164C7.87954 4.29141 8.3647 3.32617 9.92017 3.32617H11.4991V0.244531C11.4991 0.244531 10.0663 0 8.69634 0C5.83618 0 3.96665 1.73359 3.96665 4.87188V7.63047H0.787354V11.25H3.96665V20H7.87954V11.25H10.7971Z"
              fill="black"
            />
          </svg>
        </a>

      </div>
      <div class="flex flex-col space-y-2 text-center md:text-end">
        <a href={$page.data.layoutData?.data?.menu?.data?.attributes?.phoneLink} target="_blank" class="text-black text-md footer-links transition-all"
          >{$page.data.layoutData?.data?.menu?.data?.attributes?.phoneName}</a
        >
        <a href={$page.data.layoutData?.data?.menu?.data?.attributes?.emailLink} target="_blank" class="text-black text-md footer-links transition-all"
          >{$page.data.layoutData?.data?.menu?.data?.attributes?.emailName}</a
        >
      </div>
      <div class="flex flex-col space-y-2 text-center md:text-end">
        <a href={$page.data.layoutData?.data?.menu?.data?.attributes?.addressLink} target="_blank" class="text-black text-md footer-links transition-all"
          >{$page.data.layoutData?.data?.menu?.data?.attributes?.addressName}</a
        >
      </div>
      <div class="subsription-wrapper" bind:this={subscriptonWrapper}>
        <div id="mc_embed_signup" />
        {#if $subscribe}
          <p class="italic font-bold">{$page.data.layoutData?.data?.menu?.data?.attributes?.subscribeSuccess}</p>
        {:else}
          <div
            class="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3"
          >
            <input
              class="bg-white border border-black rounded-none text-black text-center text-md h-8 w-56"
              type="text"
              name="subscribe-email"
              placeholder="{$page.data.layoutData?.data?.menu?.data?.attributes?.subscribePlaceholder}"
              bind:value={user_email}
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <button
              class="bg-black h-8 w-56 border-2 border-black"
              on:mouseenter={({target})=>{
                //@ts-expect-error
                target.classList.add('gradient', 'gradient-anm')
              }}
              on:mouseleave={({target})=>{
                //@ts-expect-error               
                target.classList.remove('gradient', 'gradient-anm')
              }}
              type="submit"
              on:click={userSubscribe}>{$page.data.layoutData?.data?.menu?.data?.attributes?.subscribeToOurMailing}</button
            >
          </div>
        {/if}
      </div>
    </div>
  </section>
  <div class="flex flex-col justify-center">
    <div class="w-full h-px bg-black mt-10 mb-2" />
    <a href="{$page.params.lang ? "/"+$page.params.lang : ""}/policy" class="text-black text-center md:text-start text-md"
      >{$page.data.layoutData?.data?.menu?.data?.attributes?.privacyMenuItem}</a
    >
  </div>
</footer>
