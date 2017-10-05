import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../auth/Auth";

export default ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() && props.match
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />}
  />;
