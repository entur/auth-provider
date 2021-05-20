import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AuthProvider from '@entur/auth-provider'
import './index.css';

const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirectUri: window.location.origin,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE || '',
}

ReactDOM.render(
  <AuthProvider
    auth0Config={auth0Config}
    auth0ClaimsNamespace={process.env.REACT_APP_AUTH0_CLAIMS_NAMESPACE}
    keycloakConfigUrl="/keycloak.json"
    defaultAuthMethod="kc"
    loginAutomatically={false}
  >
    <App />
  </AuthProvider>,
  document.getElementById('root'))
