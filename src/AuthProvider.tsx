import React, { useEffect, useState } from "react";
import { getAuthMethod } from "./common";
import { KeycloakAuthProvider } from './KeycloakAuthProvider';
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0AuthProvider } from "./Auth0AuthProvider";

interface Props {
  keycloakConfigUrl?: string;
  auth0Config?: Auth0Config;
  auth0ClaimsNamespace?: string;
  defaultAuthMethod?: AuthMethod;
  children?: React.ReactNode;
  loginAutomatically?: boolean;
}

export const AuthProvider = ({
  keycloakConfigUrl,
  auth0Config,
  auth0ClaimsNamespace,
  defaultAuthMethod,
  children,
  loginAutomatically = true,
}: Props) => {
  const [authProvider, setAuthProvider] = useState<string>(
    getAuthMethod(defaultAuthMethod)
  );
    
  useEffect(() => {
    const popstateHandler = () => {
      const nextAuthProvider = getAuthMethod(defaultAuthMethod);
      if (authProvider !== nextAuthProvider) {
        setAuthProvider(nextAuthProvider);
      }
    };
    
    window.addEventListener('popstate', popstateHandler);
    
    return () => {
      window.removeEventListener('popstate', popstateHandler);
    }
  }, []);
  
  if (authProvider === 'kc') {
    return (
      <KeycloakAuthProvider
        configUrl={keycloakConfigUrl}>
        {children}
      </KeycloakAuthProvider>
    );
  } else if (authProvider === 'auth0' && auth0Config !== undefined) {
    return (
      <Auth0Provider
        useRefreshToken
        cacheLocation={window.location.hostname.indexOf('localhost') > -1 ? 'localstorage' : 'memory'}
        {...auth0Config!}>
        <Auth0AuthProvider
          claimsNamespace={auth0ClaimsNamespace}
          loginAutomatically={loginAutomatically}>
          {children}
        </Auth0AuthProvider>
      </Auth0Provider>
    );
  } else {
    throw new Error("No authentication providers were configured.");
  }
}