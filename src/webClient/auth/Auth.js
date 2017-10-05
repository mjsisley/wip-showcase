import auth0 from "auth0-js";
import auth0Config from "./auth0-config";
// TODO:
// * Move to self-hosted solution for authentication (doesn't look like it styles to Uber)

class Auth {
  // This should be moved to a config file
  auth0 = new auth0.WebAuth({
    ...auth0Config,
    responseType: "token id_token",
    scope: "openid profile email phone"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    this.loginWithUber = this.loginWithUber.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login({ username, password, redirect }) {
    this.auth0.client.login(
      { realm: "Username-Password-Authentication", username, password },
      (err, authResult) => {
        if (err) {
          console.log(err);
          alert(
            `Error: ${err.description}. Check the console for further details.`
          );
          return;
        }
        this.setSession(authResult);
        redirect();
      }
    );
  }

  signup({ email, password, redirect }) {
    this.auth0.redirect.signupAndLogin(
      { connection: "Username-Password-Authentication", email, password },
      function(err) {
        if (err) {
          console.log(err);
          alert(
            `Error: ${err.description}. Check the console for further details.`
          );
          return;
        }
        redirect();
      }
    );
  }

  handleAuthentication(redirect) {
    const that = this;
    this.auth0.parseHash({ hash: window.location.hash }, function(
      err,
      authResult
    ) {
      if (err) {
        return console.log(err);
      }

      that.auth0.client.userInfo(authResult.accessToken, function(err, user) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          that.setSession(authResult);
          redirect();
          // history.replace('/home');
        } else if (err) {
          redirect();
          // history.replace('/home');
          console.log(err);
        }
      });
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    // history.replace('/home');
  }

  logout(redirect) {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    redirect();
    // navigate to the home route
    // history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  async getInfo() {
    let token = localStorage.getItem("access_token");

    let that = this;
    function userInfo(token) {
      return new Promise(resolve => {
        that.auth0.client.userInfo(token, (err, user) => {
          resolve(user);
        });
      });
    }

    return await userInfo(token);
  }

  loginWithUber() {
    this.auth0.authorize({ connection: "uber" });
  }

  loginWithFB() {
    this.auth0.authorize({ connection: "facebook" });
  }

  loginWithGoogle() {
    this.auth0.authorize({ connection: "google-oauth2" });
  }
}

export default new Auth();
