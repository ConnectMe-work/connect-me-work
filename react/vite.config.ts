import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'node:path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig(async ({ mode }) => {

    return ({
        plugins: [
            react(),
            nodePolyfills(),
            checker({
                typescript: true,
            }),
        ],
        resolve: {
            alias: [
                {
                    find: /^~(.+)/,
                    replacement: path.resolve(process.cwd(), 'node_modules/$1'),
                },
                {
                    find: /^src(.+)/,
                    replacement: path.resolve(process.cwd(), 'src/$1'),
                },
            ],
        },

    });
});