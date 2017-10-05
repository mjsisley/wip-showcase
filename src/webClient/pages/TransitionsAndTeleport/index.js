import React from "react";
import { Flex, Text, TopPage } from "../../components";
import Teleport from "./Teleport";
import Transitions from "./Transitions";

export default props => {
  return (
    <Flex column align="center" justify="center" py={3}>
      <TopPage title="Transitions and Teleport" />
      <Text>
        Demos react-transition-group transitions and react-teleportation modals
      </Text>
      <Teleport />
      <Transitions />
    </Flex>
  );
};
