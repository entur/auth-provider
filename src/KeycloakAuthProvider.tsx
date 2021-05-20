import React, { useEffect, useState } from 'react'
import Keycloak from 'keycloak-js'

import { defaultAuthState, AuthContext } from './common'

interface Props {
  children: React.ReactNode
  configUrl?: string
}

export const KeycloakAuthProvider = ({ children, configUrl }: Props) => {
  const [auth, setAuth] = useState<Auth>(defaultAuthState)

  useEffect(() => {
    const kc = Keycloak(configUrl)
    let token: any
    let updater: any

    kc.init({ onLoad: 'login-required', checkLoginIframe: false }).success(
      (authenticated: boolean) => {
        if (authenticated) {
          token = kc.token
          setAuth({
            isLoading: false,
            isAuthenticated: true,
            user: {
              name: kc.tokenParsed.preferred_username
            },
            roleAssignments: kc.tokenParsed.roles || [],
            getAccessToken: async () => {
              return token
            },
            logout: () => kc.logout(),
            login: () => kc.login()
          })

          updater = setInterval(async () => {
            try {
              kc.updateToken(10)
              token = kc.token || ''
            } catch (_) {
              kc.logout()
            }
          }, 10000)
        } else {
          return kc.login()
        }
      }
    )

    return () => {
      if (updater) {
        clearInterval(updater)
      }
    }
  }, [configUrl])

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
