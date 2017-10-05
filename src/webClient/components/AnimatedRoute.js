import React from "react";
import { RouteTransition } from "react-router-transition";
import { Route } from "react-router-dom";

export default ({ atEnter, atLeave, atActive, mapStyles, ...props }) => (
  <RouteTransition
    atEnter={atEnter || { translateX: 2000 }}
    atLeave={atLeave || { opacity: 0, translateX: -2000 }}
    atActive={atActive || { opacity: 1, translateX: 0 }}
    pathname={props.location.pathname}
    mapStyles={
      mapStyles ||
      (styles => ({
        transform: `translateX(${styles.translateX}%)`
      }))
    }
  >
    {props.children || <Route {...props} />}
  </RouteTransition>
);
