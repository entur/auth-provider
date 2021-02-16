This example was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is linked to the @entur/auth-provider package in the parent directory for development purposes.

You can run `yarn install` and then `yarn start` to test your package.

The following environment variables are used by the example application (copy to .env file and fill out):

        REACT_APP_AUTH0_DOMAIN=
        REACT_APP_AUTH0_CLIENT_ID=
        REACT_APP_AUTH0_AUDIENCE=
        REACT_APP_AUTH0_CLAIMS_NAMESPACE=
        REACT_APP_KC_REALM=
        REACT_APP_KC_AUTH_SERVER_URL=
        REACT_APP_KC_RESOURCE=

In addition, make sure the application port matches the allowed redirect url in auth0/keycloak. E.g. if expected callback url uses port 9000:

        PORT=9000
