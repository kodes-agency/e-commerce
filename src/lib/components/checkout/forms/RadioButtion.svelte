<script lang="ts">
  export let id: string;
  export let name: string;
  export let label: string;
  export let text: string = "";
  export let value: any;
  export let binder: any;
  export let checked: boolean = false;
  export let required: boolean
</script>

<label
  class="group flex items-center justify-center border text-sm w-full font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm"
  for={id}
>
  <input
    {value}
    type="radio"
    {id}
    {name}
    {checked}
    bind:group={binder}
    class="sr-only peer"
    required={required}
  />
  <span
    class="flex flex-col justify-center pointer-events-none w-full h-full -inset-px border-4 p-5 peer-checked:border-[var(--yellow-color)] peer-disabled:border-gray-300 peer-checked:bg-[var(--light-yellow-color)]"
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class=" w-10"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 954.54 200"
      style="enable-background:new 0 0 954.54 200;"
      xml:space="preserve"
    >
      <style type="text/css">
        .st0 {
          fill: #234182;
        }
      </style>
      <g id="Warstwa_1_1_">
        <g id="Warstwa_2">
          <g>
            <g>
              <path
                class="st0"
                d="M931.74,2h-128c-14.36,0-27.53,11.64-29.42,26c-1.89,14.36,8.22,26,22.58,26h36l-15.57,118      c-2.03,15.46,8.85,28,24.31,28c15.47,0,29.65-12.54,31.69-28l15.57-118h36c14.36,0,27.53-11.64,29.42-26      C956.21,13.64,946.1,2,931.74,2z"
              />
              <path
                class="st0"
                d="M146.53,2h-96C35.07,2,20.88,14.54,18.84,30L0.25,170c-2.04,15.46,8.85,28,24.31,28h96      c14.36,0,27.53-11.64,29.42-26s-8.22-26-22.58-26h-68l12.28-92h68c14.36,0,27.53-11.64,29.42-26C171,13.64,160.89,2,146.53,2z"
              />
              <circle class="st0" cx="111.92" cy="100" r="31" />
              <path
                class="st0"
                d="M735,0c-15.47,0-29.65,12.54-31.69,28l-5.79,44h-58l5.79-44c2.04-15.46-8.85-28-24.31-28      s-29.65,12.54-31.69,28l-18.96,144c-2.03,15.46,8.85,28,24.31,28s29.65-12.54,31.69-28l6.32-48h58l-6.32,48      c-2.03,15.46,8.85,28,24.31,28s29.65-12.54,31.69-28l18.96-144C761.35,12.54,750.47,0,735,0z"
              />
            </g>
            <g>
              <path
                class="st0"
                d="M468.11,0c-60.13,0-105.08,37.39-113.17,100c-8.14,63,26.8,100,86.83,100c59.88,0,104.71-37,113.17-100      C563.35,37.38,528.27,0,468.11,0z M498.95,100c-4.08,31-23.29,48-50.32,48c-27.48,0-41.76-17-37.68-48s22.86-48,50.32-48      C488.43,52,503.03,69,498.95,100z"
              />
            </g>
            <g>
              <path
                class="st0"
                d="M468.11,0c-60.13,0-105.08,37.39-113.17,100c-8.14,63,26.8,100,86.83,100c59.88,0,104.71-37,113.17-100      C563.35,37.38,528.27,0,468.11,0z M498.95,100c-4.08,31-23.29,48-50.32,48c-27.48,0-41.76-17-37.68-48s22.86-48,50.32-48      C488.43,52,503.03,69,498.95,100z"
              />
            </g>
            <path
              class="st0"
              d="M333.22,0c-7.85,0-15.36,3.29-21.06,8.57l0,0l-0.4,0.38c-0.03,0.03-0.07,0.06-0.1,0.09l-67.49,63.59     L250.03,28c2.04-15.46-8.85-28-24.31-28s-29.65,12.54-31.69,28l-18.96,144c-2.04,15.46,8.85,28,24.31,28s29.65-12.54,31.69-28     l6.45-49.03l55.22,67.6c0.08,0.1,0.17,0.2,0.25,0.31l0.44,0.54l0,0c4.32,5.06,10.84,8.2,18.51,8.2     c15.19,0,29.12-12.31,31.12-27.5c1.01-7.67-1.22-14.6-5.63-19.59l0,0L289.9,97.81l56.01-50.37l0,0     c5.93-5.01,10.16-12.08,11.19-19.93C359.1,12.31,348.41,0,333.22,0z"
            />
          </g>
        </g>
        <g id="Warstwa_1_2_" />
      </g>
      <g id="Warstwa_1" />
    </svg>
    <p class="font-bold text-md">{label}</p>
    <p>{text}</p>
  </span>
</label>
