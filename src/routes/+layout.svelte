<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { Toast, Modal, storePopup, Drawer } from "@skeletonlabs/skeleton";
  import CardPayment from "$lib/components/checkout/CardPayment.svelte";
  import type { ModalComponent } from "@skeletonlabs/skeleton";
  import MobileFilterWrapper from "$lib/components/filters/MobileFilterWrapper.svelte";
  import Header from "$lib/components/global/Header.svelte";
  import ProgressBar from "$lib/components/global/ProgressBar.svelte";
  import Footer from "$lib/components/global/Footer.svelte";
  import { cartStore } from "$lib/store/store";
  import { page } from "$app/stores";
  import "@beyonk/gdpr-cookie-consent-banner/style.css"; // optional, you can also define your own styles
  import { Banner as GdprBanner } from "@beyonk/gdpr-cookie-consent-banner";
  export let data;

  $cartStore = data.cart;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const modalComponentRegistry: Record<string, ModalComponent> = {
    paymentModal: { ref: CardPayment },
  };

  $: cookiesPolicy = $page?.data?.footer?.data?.cookiesPolicy?.data?.attributes;

  function initAnalytics() {}
  function initTracking() {}
</script>

<main>
  {#if $page.route.id !== "/checkout" && $page.route.id !== "/product/[slug]"}
    <GdprBanner
      cookieName="gdpr_cookie_consent"
      heading={cookiesPolicy.bannerHeading}
      description={cookiesPolicy.bannerDescription}
      acceptLabel={cookiesPolicy.acceptLabel}
      rejectLabel={cookiesPolicy.rejectLabel}
      settingsLabel={cookiesPolicy.settingsLabel}
      closeLabel={cookiesPolicy.closeLabel}
      editLabel={cookiesPolicy.editLabel}
      choices={{
        necessary: {
          label: `${cookiesPolicy.necessaryLabel}`,
          description: `${cookiesPolicy.necessaryDescription}`,
          value: true,
        },
        tracking: {
          label: `${cookiesPolicy.trackingLabel}`,
          description: `${cookiesPolicy.trackingDescription}`,
          value: true,
        },
        analytics: {
          label: `${cookiesPolicy.analyticsLabel}`,
          description: `${cookiesPolicy.analyticsDescription}`,
          value: true,
        },
        marketing: {
          label: `${cookiesPolicy.marketingLabel}`,
          description: `${cookiesPolicy.marketingDescription}`,
          value: true,
        },
      }}
      on:analytics={initAnalytics}
      on:tracking={initTracking}
    />
  {/if}

  <Drawer position="right">
    <MobileFilterWrapper />
  </Drawer>
  <Modal components={modalComponentRegistry} />
  <ProgressBar />
  <Header />
  <slot />
  <Toast />
  {#if $page.route.id !== "/checkout" && $page.route.id !== "/product/[slug]"}
    <Footer />
  {/if}
</main>

<style lang="postcss">
  :global(.cookieConsentWrapper) {
    background-color: var(--white-color);
  }

  :global(.cookieConsentWrapper p) {
    color: var(--black-color);
  }

  :global(.cookieConsentWrapper a) {
    color: var(--black-color);
  }

  :global(.cookieConsentOperations label) {
    color: var(--black-color);
  }

  :global(.cookieConsentOperations span) {
    color: var(--black-color);
  }

  :global(.cookieConsentToggle) {
    background-color: var(--white-color);
    right: 40px;
    left: auto;
  }

  :global(.cookieConsentToggle path) {
    fill: var(--black-color);
  }

  :global(.cookieConsent__Button) {
    border: 1px solid var(--black-color);
    background-color: var(--white-color);
    text-transform: uppercase;
    font-size: 15px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 0px;
    color: var(--black-color);
  }

  :global(.cookieConsent__Button:hover) {
    color: var(--white-color);
    background-color: var(--black-color);
    opacity: 1;
  }

  @media only screen and (max-width: 400px) {
    :global(.cookieConsent__Right) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    :global(.cookieConsent__Button) {
      padding: auto;
      width: 80vw;
    }

    :global(.cookieConsentToggle) {
      background-color: var(--white-color);
      left: 15px;
      bottom: 15px;
      right: auto;
    }
  }
</style>
