import React from 'react'

export function getAuthMethod(defaultAuthMethod: AuthMethod): string {
  if (defaultAuthMethod === 'auth0') {
    return 'auth0';
  } else if (window.location.search.indexOf('authMethod=auth0') > -1) {
    return 'auth0';
  } else if (window.location.search.indexOf('authMethod=kc') > -1) {
    return 'kc';
  }  else {
    return defaultAuthMethod || 'auth0';
  }
}

export const defaultAuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  roleAssignments: null,
  getAccessToken: () => Promise.resolve(''),
  logout: () => {},
  login: () => {}
}

export const AuthContext = React.createContext<Auth>(defaultAuthState)
