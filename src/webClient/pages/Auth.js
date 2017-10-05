import React from "react";
import Helmet from "react-helmet";
import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Border,
  PageName,
  TopPage
} from "../components";
import { AuthSection } from "../app/appComponents";
import auth from "../auth/Auth.js";

export default props => {
  return (
    <Flex column align="center" justify="center" py={3}>
      <TopPage color="pink" title="Auth" />
      <AuthSection history={props.history} auth={auth} />
    </Flex>
  );
};
