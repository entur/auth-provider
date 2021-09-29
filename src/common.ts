import React from 'react'

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
