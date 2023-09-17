<script lang="ts">
  export let data
</script>

<div class="wrapper">
  <h1 class="text-black">{data.data.cookie.data.attributes.pageTitle}</h1>
  <div class="content">{@html data.data.cookie.data.attributes.content}</div>
</div>

<style>
  :global(.content p, .content a) {
    color: var(--black-color);
  }

  :global(.content h2) {
    color: var(--black-color);
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 6px;
  }

  :global(.content h3) {
    color: var(--black-color);
    font-size: 20px;
    padding-top: 16px;
    padding-bottom: 6px;
  }

  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    padding-bottom: 40px;
  }

  .wrapper {
    background: var(--white-color);
    padding: 15vw;
    padding-top: 20vh;
  }

  @media only screen and (max-width: 600px) {
    .wrapper {
      padding: 20px;
      padding-top: 100px;
    }

    h1 {
      font-size: 24px;
    }
  }
</style>
