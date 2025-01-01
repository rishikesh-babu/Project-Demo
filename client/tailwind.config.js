import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui,
        require('flowbite/plugin'),
    ],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
}