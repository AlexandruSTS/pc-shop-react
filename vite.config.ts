import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({mode}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/pc-shop': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false
                }
            }
        },
        // esbuild: {
        //     jsxFactory: 'React.createElement',
        //     jsxFragment: 'React.Fragment',
        // },
        // css: {
        //     modules: {
        //         localsConvention: 'camelCaseOnly',
        //     },
        // },
        build: {
            target: 'modules',
            // generate manifest.json in outDir
            manifest: true,
            rollupOptions: {
                // overwrite default .html entry
                input: 'index.html',
            },
            outDir: 'dist' // Specify the output directory for the build
        }
    };
});
