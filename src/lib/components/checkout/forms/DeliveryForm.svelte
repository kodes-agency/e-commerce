<script lang="ts">
  import RadioButtion from "$lib/components/checkout/forms/RadioButtion.svelte";
  import Select from "svelte-select";
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  let officeDelivery: any;
  let country: any;
  let city: any;
  let office: any;
  let street: any;
  let quarter: any;

  const url =
    "http://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService";

  function handleRequestType(type: any, countryCode?: any, cityID?: any) {
    const validateAddress = [
      {
        type: "getCountries",
        body: { GetCountriesRequest: "" },
      },
      {
        type: "getCities",
        body: { countryCode: countryCode || "BGR" },
      },
      {
        type: "getOffices",
        body: {
          countryCode: countryCode || "BGR",
          cityID: cityID,
        },
      },
      {
        type: "getStreets",
        body: { cityID: cityID },
      },
      {
        type: "getQuarters",
        body: { cityID: cityID },
      },
    ];

    return validateAddress.find((item) => item.type === type)?.body;
  }

  const getData = async (type: any, countryCode?: any, cityID?: any) => {
    const response = await fetch(`${url}.${type}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(handleRequestType(type, countryCode, cityID)),
    });
    const data: any = await response.json();

    if (type === "getCountries") {
      const items = await data.countries.map((country: any) => {
        return {
          value: country.code,
          label: country.name,
        };
      });
      return items;
    }

    if (type === "getCities") {
      const items = await data.cities.map((city: any) => {
        return {
          value: city.id,
          label: city.name,
        };
      });
      return items;
    }

    if (type === "getStreets") {
      const items = await data.streets.map((street: any) => {
        return {
          value: street.id,
          label: street.name,
        };
      });
      return items;
    }

    if (type === "getOffices") {
      const items = await data.offices.map((office: any) => {
        return {
          value: office.id,
          label: office.name + " " + "| №:" + office.code,
        };
      });
      return items;
    }

    if (type === "getQuarters") {
      const items = await data.quarters.map((quarter: any) => {
        return {
          value: quarter.id,
          label: quarter.name,
        };
      });
      return items;
    }
  };

  let fieldsetEl: HTMLFieldSetElement
</script>

<fieldset bind:this={fieldsetEl} name="checkout-fieldset" class="space-y-2">
  <h2 class="text-xl md:text-2xl font-medium text-gray-900">Данни за поръчка</h2>
  <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-10 py-2">
    <RadioButtion
      id="office"
      name="office"
      label="Доставка до офис"
      value="1"
      bind:binder={officeDelivery}
    />
    <RadioButtion
      id="address"
      name="office"
      label="Доставка до адрес"
      value="0"
      bind:binder={officeDelivery}
    />
  </div>
  <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-10 items-center">
    <div class="flex flex-col w-full">
      <label class="whitespace-nowrap" for="billing_first_name"
        >Име:</label
      >
      <input
        type="text"
        class="form-input bg-transparent px-3 min-w-0 w-full"
        name="billing_first_name"
        id="billing_first_name"
        value={$page?.data?.form?.billing_address.first_name || ""}
        required
      />
    </div>
    <div class="flex flex-col w-full">
      <label class="whitespace-nowrap" for="billing_last_name">Фамилия:</label
      >
      <input
        type="text"
        class="form-input bg-transparent px-3 w-full"
        name="billing_last_name"
        id="billing_last_name"
        value={$page?.data?.form?.billing_address.last_name || ""}
        required
      />
    </div>
  </div>
  <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-10 items-center">
    <div class="flex flex-col w-full">
      <label class="" for="billing_email">Имейл:</label>
      <input
        type="email"
        class="form-input bg-transparent px-3 w-full"
        name="billing_email"
        id="billing_email"
        value={$page?.data?.form?.billing_address.email || ""}
        required
      />
    </div>
    <div class="flex flex-col w-full">
      <label class="" for="billing_phone">Телефон:</label>
      <input
        type="tel"
        class="form-input bg-transparent px-3 w-full"
        name="billing_phone"
        id="billing_phone"
        value={$page?.data?.form?.billing_address.phone || ""}
        required
      />
    </div>
  </div>

  <div class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-10 items-center">
    <div class="flex flex-col w-full">
      <label class="" for="country">Държава:</label>
      <input
        type="text"
        class="form-input bg-transparent px-3 w-full"
        name="country"
        id="country"
        value="България"
        disabled
        required
      />
    </div>

    <div class="flex flex-col w-full">
      <label for="city">Населено място:</label>
      {#await getData("getCities")}
        <Select
          --border-radius="0 0 0 0"
          --list-border-radius="0 0 0 0"
          --border="1px solid black"
          --background="transparent"
          loading={true}
          disabled
          placeholder="Изберете"
        />
      {:then items}
        <Select
          {items}
          name="city"
          searchable={true}
          placeholder="Изберете"
          required
          bind:value={city}
          --border-radius="0 0 0 0"
          --border="1px solid black"
          --list-border-radius="0 0 0 0"
          --background="transparent"
          on:change={() => {
            office = null;
            street = null;
            quarter = null;
          }}
        />
      {/await}
    </div>
  </div>

  {#if officeDelivery == 1}
    {#if city}
      <div transition:slide>
        {#await getData("getOffices", country?.value, city?.value)}
        <label for="">Офис на Еконт:</label>
          <Select
            --border-radius="0 0 0 0"
            --border="1px solid black"
            --list-border-radius="0 0 0 0"
            --background="transparent"
            loading={true}
            placeholder="Изберете офис"
            disabled
            on:change={() => {
              console.log("change");
            }}
          />
        {:then items}
        <label for="office">Офис на Еконт:</label>
          <Select
            --border-radius="0 0 0 0"
            --border="1px solid black"
            --list-border-radius="0 0 0 0"
            --background="transparent"
            {items}
            required
            searchable={true}
            placeholder="Изберете офис"
            name="office"
            bind:value={office}
            --item-height="auto"
            --item-line-height="auto"
          >
            <div slot="item" class="item" let:item>
              {item.label}
            </div>
          </Select>
        {/await}
      </div>
    {/if}
  {/if}
  {#if officeDelivery == 0}
    {#if city}
      <div
        transition:slide
        class="flex flex-col sm:flex-row sm:space-x-10 items-center"
      >
        <div class="flex flex-col w-full">
          {#await getData("getQuarters", country?.value, city?.value)}
            <label for="">Квартал:</label>
            <Select
              --border-radius="0 0 0 0"
              --border="1px solid black"
              --list-border-radius="0 0 0 0"
              --background="transparent"
              loading={true}
              disabled
              placeholder="Изберете квартал"
            />
          {:then items}
            <label for="quarter">Квартал:</label>
            <Select
              --border-radius="0 0 0 0"
              --border="1px solid black"
              --list-border-radius="0 0 0 0"
              --background="transparent"
              required
              {items}
              name="quarter"
              searchable={true}
              placeholder="Изберете квартал"
              bind:value={quarter}
            />
          {/await}
        </div>
        <div class="flex flex-col w-full">
          {#await getData("getStreets", country?.value, city?.value)}
            <label for="">Улица:</label>
            <Select
              --border-radius="0 0 0 0"
              --border="1px solid black"
              --list-border-radius="0 0 0 0"
              --background="transparent"
              loading={true}
              disabled
              placeholder="Изберете адрес"
            />
          {:then items}
            <label for="address_1">Улица:</label>
            <Select
              --border-radius="0 0 0 0"
              --border="1px solid black"
              --list-border-radius="0 0 0 0"
              --background="transparent"
              {items}
              name="address_1"
              searchable={true}
              placeholder="Изберете адрес"
              required
              bind:value={street}
              --item-height="auto"
              --item-line-height="auto"
            >
              <div slot="item" class="item" let:item>
                {item.label}
              </div>
            </Select>
          {/await}
        </div>
        <div class="flex flex-col w-2/5">
          <label class="" for="street_number">№</label>
          <input
            type="text"
            class="form-input bg-transparent px-3 w-full"
            name="street_number"
            id="street_number"
            required
          />
        </div>
      </div>
    {/if}
  {/if}
  <button on:click={()=>{console.log(fieldsetEl.validity)}}>Validate</button>
</fieldset>

<style lang="postcss">
  .item {
    min-height: 20px;
    padding: 10px 0;
    line-height: 16px;
    display: flex;
    line-break: auto;
    white-space: pre-wrap;
    align-items: center;
  }
</style>
