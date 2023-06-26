import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./App.css"
import {Auth0Provider} from "@auth0/auth0-react"
import 'vite/modulepreload-polyfill'

// const auth_domain = import.meta.env.VITE_AUTH0_DOMAIN;
// const auth_client = import.meta.env.VITE_AUTH0_CLIENT_ID;
// const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
// const url = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain="eafc-projint-anghel.eu.auth0.com"
        clientId="qJ2haGAjsir4Uj3z7Bf3dLAO0YZUe3E7"
        useRefreshTokens={true}
        authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://pc-shop/api",
            scope: 'openid profile email write:item read:all-items write:category'
        }}
    >
        <React.StrictMode>
            <App/>
        </React.StrictMode>
        </Auth0Provider>
        );
