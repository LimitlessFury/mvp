/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include if you might ever use a pages dir
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}", // A broader catch-all if all code is in src
  ],
  theme: {
    extend: {
      // You can add theme extensions here later if needed
      // For example:
      // colors: {
      //   'brand-blue': '#1992d4',
      // },
    },
  },
  plugins: [
    // You can add plugins here later if needed
  ],
};