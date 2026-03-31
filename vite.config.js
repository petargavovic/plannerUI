import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            // Proxy /api requests to the Spring Boot backend on port 8080
            // The backend is served under /planner/api, so we need to rewrite.
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, '/planner/api'); },
            },
        },
    },
});
