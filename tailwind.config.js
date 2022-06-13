/** @type {import("tailwindcss").Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
