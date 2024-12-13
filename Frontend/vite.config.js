import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            process: 'process/browser',
        },
    },
});
