import {
    getAccessTokenServer,
    getSessionServer,
    getSigninContextServer,
    isAuthenticatedServer
} from "./server";

const Auth = {
  get capabilities() {
    return getSigninContextServer().then(async (signinContext) => {
      if (signinContext === "local") {
        return {
          member: true,
          leader: true,
          webmaster: true
        };
      } else if (signinContext === "keycloak") {
        return {
          member: true,
          leader: false,
          webmaster: false
        };
      }
      return {
        member: false,
        leader: false,
        webmaster: false
      };
    });
  },
  get accessToken() {
    return getAccessTokenServer();
  },
  get signinContext() {
    return getSigninContextServer();
  },
  get session() {
    return getSessionServer();
  },
  get isAuthenticated() {
    return isAuthenticatedServer();
  }
};

export default Auth;
