# @entur/auth-provider

> Authentication provider for Entur applications. Primarily aimed at easing transition between legacy keycloak and auth0 in internal and data provider applications.

[![NPM](https://img.shields.io/npm/v/@entur/auth-provider.svg)](https://www.npmjs.com/package/@entur/auth-provider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @entur/auth-provider
```

## Usage

```tsx
import React from 'react'
import { render } from 'react-dom';

import AuthProvider, { useAuth } from '@entur/auth-provider';

// Provide either auth0Config, keycloakConfigUrl or both
const auth0Config = {}; //<-- see auth0 docs for required fields
const auth0ClaimsNamespace = ''; // <-- required for custom roles parsing
const keycloakConfigUrl = ''; // <-- where to find keycloak config

// defaultAuthMethod is optional, kc (keycloak) is default. User can override with query parameter:
// ?authMethod=kc|auth0
const defaultAuthMethod = 'auth0';

// If set to false, app will not automatically redirect to login page
// Note: Only works on auth0 - keycloak will always redirect automatically
const loginAutomatically = false;

const App = () => {
  const {
    isAuthenticated
  } = useAuth();

  return (
    <h1>
      {isAuthenticated ? 'Yay' : 'Oh no ...'}
    </h2>
  )
}

render(
  <AuthProvider
    auth0Config={auth0Config}
    auth0ClaimsNamespace={auth0ClaimsNamespace}
    keycloakConfigUrl={keycloakConfigUrl}
    defaultAuthMethod={defaultAuthMethod}
    loginAutomatically={loginAutomatically}
  >
    <App />
  <AuthProvider>
);
```

## License

EUPL © [entur/nrp](https://github.com/entur/nrp)
