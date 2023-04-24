interface Auth0Config {
  domain: string
  clientId: string
  redirectUri: string
  audience: string
  useRefreshToken?: boolean
  cacheLocation?: 'localstorage' | 'memory'
}

interface Auth<T extends User> {
  isLoading: boolean
  isAuthenticated: boolean
  user?: T | null
  roleAssignments?: string[] | null
  getAccessToken: () => Promise<string>
  logout: () => void
  login: (redirectUri?: string) => void
}

export interface User {
  name?: string
}
