
interface ImportMeta {

    env: {
        // [key: string]: any;
        VITE_APP_TITLE: string;
        VITE_API_URL: string;
        VITE_AUTH0_DOMAIN: string;
        VITE_AUTH0_CLIENT_ID: string;
        VITE_AUTH0_AUDIENCE: string
        MODE: string;
        NODE_ENV: string;
        SSR?: boolean | undefined;
    };
}
