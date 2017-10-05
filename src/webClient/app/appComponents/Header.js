import React from "react";
import { NavLink, Route, Switch, Box } from "react-router-dom";
import styled, { injectGlobal } from "styled-components";
import { routes } from "../Routes";
import Headroom from "react-headroom";

import {
  Flex,
  Box,
  Button,
  Text,
  Modal,
  Teleport,
  Absolute
} from "../../components";
import HeaderLink from "./HeaderLink";
import auth from "../../auth/Auth";
const activeClassName = "nav-item-active";

const Header = () => (
  // <Headroom wrapperStyle={{ marginBottom: "104px" }}>
  // <Absolute bg="darkkhaki">
  <Box bg="darkkhaki">
    <Flex w="100vw" p={4} align="center" justify="space-between">
      <Flex is="nav" wrap>
        {routes.map(
          route =>
            !route.hidden && (!route.protected || auth.isAuthenticated()) ? (
              <HeaderLink
                key={route.path}
                exact={route.exact}
                to={
                  route.modal ? (
                    { pathname: route.path, state: { modal: true } }
                  ) : (
                    route.path
                  )
                }
                activeClassName={activeClassName}
              >
                {route.title}
              </HeaderLink>
            ) : null
        )}
      </Flex>
    </Flex>
  </Box>
);
// </Headroom>;

export default Header;
