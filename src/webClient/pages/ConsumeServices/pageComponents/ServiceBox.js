import React from "react";
import { Heading, Box, Text, Button, Flex, Border } from "../../../components";

const ServiceBox = props =>
  <Border my={4}>
    <Flex py={4} w="50vw" align="center" justify="center" column>
      {props.children}
    </Flex>
  </Border>;

export default ServiceBox;
