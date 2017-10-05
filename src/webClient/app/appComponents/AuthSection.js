import React from "react";
import {
  Button as RawButton,
  Text,
  Teleport,
  Box,
  Flex
} from "../../components";
import styled from "styled-components";

const Button = styled(RawButton)`
margin-top: 10px;
margin-bottom: 10px;
`;

const AuthSection = ({
  history,
  auth,
  noPasswordLogin,
  noSignup,
  noUberLogin,
  noFBLogin,
  noGoogleLogin,
  loginRedirect
}) => {
  const onAuth = () => {
    auth.isAuthenticated()
      ? auth.logout(() => {
          history.replace("/");
          Teleport.clear();
        })
      : auth.login({
          username: "mjsisley@u.washington.edu",
          password: "123",
          redirect: () => {
            loginRedirect
              ? history.replace(loginRedirect)
              : history.replace("/private");
            Teleport.clear();
          }
        });
  };

  const signUp = () => {
    auth.signup({
      email: "mjsisley@u.washington.edu",
      password: "123"
      // redirect: () => {
      //   history.replace("/");
      //   Teleport.clear();
      // }
    });
  };
  const back = e => {
    // e.stopPropagation();
    history.goBack();
  };

  const loginWithUber = () => {
    auth.loginWithUber();
  };

  const loginWithFB = () => {
    auth.loginWithFB();
  };

  const loginWithGoogle = () => {
    auth.loginWithGoogle();
  };
  return (
    <Flex column align="center" justify="center">
      {!noSignup &&
        !auth.isAuthenticated() &&
        <Button onClick={signUp}>Sign Up</Button>}
      {!noPasswordLogin &&
        <Button onClick={onAuth}>
          {auth.isAuthenticated() ? "Auth Logout" : "Auth Login with Email"}
        </Button>}
      {!noUberLogin &&
        !auth.isAuthenticated() &&
        <Button onClick={loginWithUber}>Log In with Uber</Button>}
      {!noFBLogin &&
        !auth.isAuthenticated() &&
        <Button onClick={loginWithFB}>Log In with FB</Button>}
      {!noGoogleLogin &&
        !auth.isAuthenticated() &&
        <Button onClick={loginWithGoogle}>Log In with Google</Button>}
      <Text>
        Result from Authentication: {`${auth.isAuthenticated()}`}
      </Text>
    </Flex>
  );
};

export default AuthSection;
