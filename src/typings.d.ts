interface Auth0Config {
  domain: string
  clientId: string
  redirectUri: string
  audience: string
  useRefreshToken?: boolean
  cacheLocation?: 'localstorage' | 'memory'
}

interface Auth {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  roleAssignments: string[] | null
  getAccessToken: () => Promise<string>
  logout: () => void
  login: () => void
}

interface User {
  name: string
}
