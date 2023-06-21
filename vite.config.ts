import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import copy from 'rollup-plugin-copy';

export default defineConfig(({ mode }) => {

    const PROD = mode === 'production';
    let base_url = 'http://localhost:8090';
    if (PROD) {
        base_url = 'http://pc-shop-alex.us-east-1.elasticbeanstalk.com';
    }
    return {
        base: '',
        plugins: [
            reactRefresh(),
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
                    target: base_url,
                    changeOrigin: true,
                    secure: false,
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
