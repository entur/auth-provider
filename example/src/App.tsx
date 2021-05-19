import React, { useState } from 'react'
import { useAuth } from '@entur/auth-provider'

const App = () => {
  const auth = useAuth();

  const [accessToken, setAccessToken] = useState<string>('');

  const getAccessToken = async () => {
    setAccessToken(await auth.getAccessToken());
  }

  if (auth.isLoading) {
    return <h1>Loading ... </h1>;
  }

  if (!auth.isAuthenticated) {
    return (
      <>
        <h1>Not authenticated</h1>
        <p><button type="button" onClick={() => auth.login()}>Log in</button></p>
      </>
    );
  }

  return (
    <>
      <h1>Entur auth common example!</h1>
      <p>Hi {auth.user?.name}</p>
      <p><button type="button" onClick={() => auth.logout()}>Log out</button></p>
      <h2>Role assignments</h2>
      <p style={{ maxWidth: '50%', overflowWrap: 'break-word' }}>{auth.roleAssignments}</p>
      <h2>Access token</h2>
      <p><button type="button" onClick={() => getAccessToken()}>Get access token</button></p>
      <p style={{ maxWidth: '50%', overflowWrap: 'break-word' }}>{accessToken}</p>
    </>
  )
}

export default App
