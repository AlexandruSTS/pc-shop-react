import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
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
