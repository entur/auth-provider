import React from 'react'
import { Auth, User } from './typings'

export const defaultAuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  roleAssignments: null,
  getAccessToken: () => Promise.resolve(''),
  logout: () => {},
  login: () => {}
}

function createAuthContext<T extends User>() {
  return React.createContext<Auth<T>>(defaultAuthState)
}

export const AuthContext = createAuthContext();

