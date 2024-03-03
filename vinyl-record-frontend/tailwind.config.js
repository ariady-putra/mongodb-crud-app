module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      //
      "black",
      "business",
      "coffee",
      "dark",
      "dracula",
      "forest",
      "halloween",
      "luxury",
      "night",
      "synthwave",
    ],
    darkTheme: "black",
  },
};
