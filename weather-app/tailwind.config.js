/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                card: "rgba(255, 255, 255, 0.05)",
                cardBorder: "rgba(255, 255, 255, 0.1)",
                accent: "#00E5FF", // Cyan highlight
            },
            fontFamily: {
                sans: ['Inter', 'Poppins', 'sans-serif'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            },
            boxShadow: {
                'neon': '0 0 10px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }
        },
    },
    plugins: [],
}
