import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Auth0Provider
        domain="eafc-projint-anghel.eu.auth0.com"
        clientId="qJ2haGAjsir4Uj3z7Bf3dLAO0YZUe3E7"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <React.StrictMode>
            <App/>
        </React.StrictMode>
        </Auth0Provider>
        );
