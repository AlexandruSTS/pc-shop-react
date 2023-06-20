import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import {Auth0Provider} from "@auth0/auth0-react"
import 'vite/modulepreload-polyfill'

const auth_domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth_client = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
import 'vite/modulepreload-polyfill';
// const url = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain={auth_domain}
        clientId={auth_client}
        useRefreshTokens={true}
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: audience,
            scope: 'openid profile email write:item read:all-items write:category'
        }}
    >
        <React.StrictMode>
            <App/>
        </React.StrictMode>
        </Auth0Provider>
        );
