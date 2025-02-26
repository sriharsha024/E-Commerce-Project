import tailwindcss from '@tailwindcss/postcss';

export default {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {
            fontFamily: {
                sans: [" ", "sans-serif"],
            },
            boxShadow: {
                custom: "0 0 15px rgba(0, 0, 0, 0.3)",
                right: "10px 0 10px -5px rgba(0, 0, 0, 0.3)"
            },
            colors: {
                customBlue: "rgba(28, 100, 242, 1)",
                banner: {
                    color1: "#FDC200",
                    color2: "#FF2C2C",
                    color3: "#21AD61",
                    color4: "#723DA6",
                },
            },
            backgroundImage: {
                "custom-gradient": "linear-gradient(to right, #111827,#1F2937)",
                "bottom-gradient": "linear-gradient(to right, #7E22CE,#EF4444)",
                "custom-gradient2": "linear-gradient(135deg,#F5F5F5,#EAE7DC)",
            }
        },
    },
    plugins: [
        tailwindcss,
    ],
}