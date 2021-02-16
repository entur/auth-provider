import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./common";

interface Props {
  children?: React.ReactNode;
  claimsNamespace?: string;
}

export const Auth0AuthProvider = ({children, claimsNamespace}: Props) => {
  const {
    isLoading,
    isAuthenticated,
    user,
    loginWithRedirect,
    getIdTokenClaims,
    getAccessTokenSilently,
    logout
  } = useAuth0();
  const [roleAssignments, setRoleAssignments] = useState<any>();
  
  useEffect(() => {
    const getClaims = async () => {
      const idTokenClaims = await getIdTokenClaims();
      setRoleAssignments(idTokenClaims[claimsNamespace!]);
    };
    if (isAuthenticated && claimsNamespace !== undefined) {
      getClaims();
    }
  }, [isAuthenticated, getIdTokenClaims]);
  
  if (!isAuthenticated && !isLoading) {
    loginWithRedirect();
    return null;
  }
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      user,
      roleAssignments,
      getAccessToken: getAccessTokenSilently,
      logout,
    }}>
    {children}
    </AuthContext.Provider>
    );
  }