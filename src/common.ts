import React from 'react';

export function getAuthMethod(defaultAuthMethod: AuthMethod): string {
  if (window.location.search.indexOf('authMethod=auth0') > -1) {
    localStorage.setItem('ENTUR::authMethod', 'auth0');
  } else if (window.location.search.indexOf('authMethod=kc') > -1) {
    localStorage.setItem('ENTUR::authMethod', 'kc');
  } else if (localStorage.getItem('ENTUR::authMethod') === null) {
    localStorage.setItem('ENTUR::authMethod', defaultAuthMethod || 'kc');
  }
  return localStorage.getItem('ENTUR::authMethod') || defaultAuthMethod || 'kc';
}

export const defaultAuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  roleAssignments: null,
  getAccessToken: () => Promise.resolve(""),
  logout: () => {},
  login: () => {}
};

export const AuthContext = React.createContext<Auth>(defaultAuthState);
