module.exports = function (app) {
    app.get(
      '/keycloak.json',
      (req, res) => {
        res.send({
          realm: process.env.REACT_APP_KC_REALM,
          'tokens-not-before': 1490857383,
          'public-client': true,
          'auth-server-url': process.env.REACT_APP_KC_AUTH_SERVER_URL,
          resource: process.env.REACT_APP_KC_RESOURCE
        });
      }
    )
}