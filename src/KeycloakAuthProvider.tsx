import React from 'react';
import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";
import { defaultAuthState, AuthContext } from "./common";

interface Props {
  children: React.ReactNode;
  configUrl?: string;
  loginAutomatically?: boolean;
}

export const KeycloakAuthProvider = ({ children, configUrl, loginAutomatically }: Props) => {
  const [auth, setAuth] = useState<Auth>(defaultAuthState);
  
  useEffect(() => {
    const kc = Keycloak(configUrl);
    let token: any;
    let updater: any;
    
    kc.init({ onLoad: 'login-required', checkLoginIframe: false }).success((authenticated: boolean) => {
      if (authenticated) {
        token = kc.token;
        setAuth({
          isLoading: false,
          isAuthenticated: true,
          user: {
            name: kc.tokenParsed.preferred_username
          },
          roleAssignments: kc.tokenParsed.roles || [],
          getAccessToken: async () => {
            return token;
          },
          logout: () => kc.logout(),
          login: () => kc.login(),
        });
        
        updater = setInterval(async () => {
          try {
            kc.updateToken(10);
            token = kc.token || '';
          } catch (_) {
            kc.logout();
          }
        }, 10000);
      } else if (loginAutomatically) {
        return kc.login();
      } else {
        return;
      }
    });
    
    return () => {
      if (updater) {
        clearInterval(updater);
      }
    };
  }, [configUrl]);
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
  