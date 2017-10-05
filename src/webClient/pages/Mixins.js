import React from "react";
import Helmet from "react-helmet";
import { Heading, Box, Text, Flex, PageName, TopPage } from "../components";
// import { jumbotron, card } from "styled-components-mixins/bootstrap";
import styled from "styled-components";

// const Jumbo = styled.div`
//   ${jumbotron} z-index: 1;
//   background-color: tomato;
// `;

// const Card = styled(Box)`${card};`;

export default props => {
  return (
    <Flex column align="center" justify="center" py={3}>
      <TopPage color="green" title="Mixins" />
      {/* <Jumbo>
        <Text>
          Yooo, full power of Bootstrap (and others)... right in
          styled-components for super easy extendability
        </Text>
      </Jumbo>
      <Card w="50%" m="auto">
        It's a Bootstrap card
      </Card> */}
    </Flex>
  );
};
