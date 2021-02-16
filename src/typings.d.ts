
declare module 'keycloak-js' {
  const Keycloak: (config: any) => any;
  export default Keycloak;
}

type AuthMethod = "kc" | "auth0" | undefined;

interface Auth0Config {
  domain: string;
  clientId: string;
  redirectUri: string;
  audience: string;
}

interface Auth {
  isLoading: boolean,
  isAuthenticated: boolean,
  user: User | null;
  roleAssignments: string[] | null;
  getAccessToken: () => Promise<string>;
  logout: () => void;
}

interface User {
  name: string;
}