import React from "react";
import { TopPage, Modal, Teleport, Button, Text, Box } from "../../components";
import { AuthSection } from "../../app/appComponents";
import auth from "../../auth/Auth";
import { PageControl } from "./pageComponents";
import { connect } from "react-redux";

const Login = props => (
  <Box>
    <AuthSection
      history={props.history}
      auth={auth}
      noPasswordLogin
      noSignup
      noUberLogin
    />
    <PageControl
      appPageNumber={props.appPageNumber}
      appLength={props.appLength}
      match={props.match}
      okayToProceed={auth.isAuthenticated()}
    />
  </Box>
);

export default connect()(Login);
