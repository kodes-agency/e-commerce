<script lang="ts">
  import RadioButtion from "$lib/components/global/RadioButtion.svelte";
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import { get } from "svelte/store";
  import { slide } from "svelte/transition";

  let searchable = true;

  let officeDelivery: 1 | 0;

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

  function handle() {
    console.log("dsadasdas");
  }
</script>

<form class="container">
  <div class="flex">
    <RadioButtion
      id="office"
      name="office"
      label="Доставка до офис на Еконт"
      value={1}
      on:valueChange={(event) => {
        officeDelivery = event.detail.value;
        city = null
      }}
    />
    <RadioButtion
      id="address"
      name="office"
      label="Доставка до адрес"
      value={0}
      on:valueChange={(event) => {
        officeDelivery = event.detail.value;
        city = null
      }}
    />
  </div>
  <!-- <button
    on:click={() => {
      console.log(officeDelivery);
    }}>Click</button
  > -->
  {#if officeDelivery !== undefined} 
    <div transition:slide>
        {#await getData("getCities")}
          <Select loading={true} placeholder="Изберете град" on:change={handle} />
        {:then items}
          <Select
            {items}
            searchable={true}
            placeholder="Изберете град"
            bind:value={city}
            on:change={()=>{
                office = null
                street = null
                quarter = null
            }}
          />
        {/await}
    
        {#if officeDelivery == 1}
          {#if city}
          <div transition:slide>
              {#await getData("getOffices", country?.value, city?.value)}
                <Select
                  loading={true}
                  placeholder="Изберете офис"
                  on:change={() => {
                    console.log("change");
                  }}
                />
              {:then items}
                <Select
                  {items}
                  searchable={true}
                  placeholder="Изберете офис"
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
        {:else}
          {#if city}
          <div transition:slide>
              {#await getData("getQuarters", country?.value, city?.value)}
                <Select loading={true} placeholder="Изберете квартал"/>
              {:then items}
                <Select
                  {items}
                  searchable={true}
                  placeholder="Изберете квартал"
                  bind:value={quarter}
                />
              {/await}
              {#await getData("getStreets", country?.value, city?.value)}
              <Select loading={true} placeholder="Изберете квартал"/>
              {:then items}
                <Select
                  {items}
                  searchable={true}
                  placeholder="Изберете адрес"
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
          {/if}
        {/if}
    </div>
    {/if}
</form>

<style>
  .container {
    width: 350px;
  }

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
