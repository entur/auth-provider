import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { Auth0AuthProvider } from './Auth0AuthProvider'
import { Auth0Config } from './typings'

interface Props {
  keycloakConfigUrl?: string
  auth0Config?: Auth0Config
  auth0ClaimsNamespace?: string
  children?: React.ReactNode
  loginAutomatically?: boolean
}

export const AuthProvider = ({
  auth0Config,
  auth0ClaimsNamespace,
  children,
  loginAutomatically = true
}: Props) => {
  return (
    <Auth0Provider
      useRefreshToken
      cacheLocation={
        window.location.hostname.indexOf('localhost') > -1
          ? 'localstorage'
          : 'memory'
      }
      {...auth0Config!}
    >
      <Auth0AuthProvider
        claimsNamespace={auth0ClaimsNamespace}
        loginAutomatically={loginAutomatically}
      >
        {children}
      </Auth0AuthProvider>
    </Auth0Provider>
  )
}
