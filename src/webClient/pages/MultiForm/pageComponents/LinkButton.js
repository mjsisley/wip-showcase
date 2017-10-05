import React from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  Flex,
  PageName,
  TopPage,
  Text,
  Button,
  Box,
  Input
} from "../../../components";

const LinkButton = props => (
  <Link exact={props.exact} to={props.to}>
    <Button onClick={props.onClick}>{props.children}</Button>
  </Link>
);

export default LinkButton;
