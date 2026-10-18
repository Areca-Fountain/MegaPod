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
    server: {
        // Local dev: the browser calls /api on :5173 and Vite forwards it to the Express server.
        // This mirrors the production rewrite in vercel.json, so the same code works in both places.
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
})