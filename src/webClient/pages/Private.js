import React from "react";
import { Flex, Text, TopPage } from "../components";

export default props => {
  return (
    <Flex column align="center" justify="center" py={3}>
      <TopPage title="Private" color="tomato" />
      <Text>It should only be reached if the user is authenticated</Text>
    </Flex>
  );
};
