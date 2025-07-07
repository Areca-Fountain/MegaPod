import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        svgr()
    ],
    define: {
        'process.env': {}, // Prevents undefined env vars
    },
    resolve: {
        alias: {
            buffer: 'buffer', // Enables Buffer usage (for CSL)
        },
    },
})
