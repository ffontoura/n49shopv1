import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    // https://tailwindcss.com/docs/container#centering-by-default
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        "header": "0px 1px 3px 1px rgba(0,0,0,0.1)",
        "searchsugestions": "0 0 5px -3px #000",
        "service": "0 0 1px 1px #C7C7CC",
        "minicart": "0px 0px 10px rgba(0,0,0,0.15)",
        "cookieconsent": "0px 0px 3px rgba(0,0,0,0.16)",
      },
      maxWidth: {
        "3xl": "1920px",
      },
      spacing: {
        "1.7": "7.5px",
        "2.5": "10px",
        "4.5": "15px",
        "7.5": "30px",
        "8.5": "35px",
        "15": "60px",
        "25": "100px",
      },
      fontSize: {
        "1.5xl": "22px",
        "2.5xl": "26px",
      },
      animation: {
        "slide-left": "slide-left-frame 0.4s ease normal",
        "slide-right": "slide-right-frame 0.4s ease normal",
        "slide-bottom": "slide-bottom-frame 0.4s ease normal",
        "progress": "progress-frame ease normal",
      },
      keyframes: {
        "slide-left-frame": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-right-frame": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-bottom-frame": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "progress-frame": {
          from: {
            "--dot-progress": "0%",
          },
          to: {
            "--dot-progress": "100%",
          },
        },
      },
    },
  },
};
