import React from "react";
import Loading from "./Loading";
import auth from "../../auth/Auth.js";

export default props => {
  auth.handleAuthentication(() => {
    props.history.push("/multiForm/3");
  });

  return <Loading />;
};
