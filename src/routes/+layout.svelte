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

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  const modalComponentRegistry: Record<string, ModalComponent> = {
    paymentModal: { ref: CardPayment },
  };
</script>

<main>
  <Drawer position="right">
    <MobileFilterWrapper />
  </Drawer>
  <Modal components={modalComponentRegistry} />
  <ProgressBar />
  <Header />
  <slot />
  <Toast />
  <div class="h-96 bg-[var(--white-color)] w-full" />
</main>
