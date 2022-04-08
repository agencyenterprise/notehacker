module.exports = {
    content: [
        "./src/**/*.njs",
        "./node_modules/nullstack-tailwind/src/components/**/*.nts"
    ],
    plugins: [require("@tailwindcss/forms")],
};
