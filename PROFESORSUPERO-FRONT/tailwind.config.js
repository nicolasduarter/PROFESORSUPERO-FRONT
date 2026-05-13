/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                // opcional: forzar paleta similar a la que tenías
                green: {
                    600: "#16a34a",
                    700: "#15803d"
                }
            },
            boxShadow: {
                // sombras un poco más marcadas como en el mock
                'card': '0 8px 20px rgba(16, 24, 40, 0.08)'
            }
        }
    },
    plugins: [],
}
