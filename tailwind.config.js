module.exports = {
    content: [
        "./src/**/*.jsx",
        "./node_modules/nullstack-tailwind/src/components/**/*.nts"
    ],
    plugins: [require("@tailwindcss/forms")],
};
