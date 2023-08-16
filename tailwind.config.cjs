/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    require("path").join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],

  theme: {
    extend: {},
  },
  plugins: [
    ...require("@skeletonlabs/skeleton/tailwind/skeleton.cjs")(),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};

module.exports = config;
