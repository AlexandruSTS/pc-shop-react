import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig(({ mode }) => {

    const PROD = mode === 'production';
    let base_url = 'http://localhost:8090';
    if (PROD) {
        base_url = 'pc-shop-alex.us-east-1.elasticbeanstalk.com';
    }
    return {
        plugins: [
            copy({
                targets: [
                    {
                        src: ['public/**/*'],
                        dest: 'dist',
                        ignore: ['index.html', 'assets/**/*'],
                    },
                ],
            }),
        ],
        server: {
            proxy: {
                '/pc-shop': {
                    target: 'http://localhost:8090',
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        build: {
            manifest: true,
            rollupOptions: {
                output: {
                    entryFileNames: PROD ? '[name]-[hash].js' : undefined,
                    chunkFileNames: PROD ? '[name]-[hash].js' : undefined,
                    assetFileNames: PROD ? '[name]-[hash][extname]' : undefined,
                },
            },
            publicDir: './',
        },
    };
});
