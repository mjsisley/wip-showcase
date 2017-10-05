import React from "react";
import Helmet from "react-helmet";
import {
  Heading,
  Flex,
  PageName,
  TopPage,
  Text,
  Box,
  Image
} from "../components";
import styled, { keyframes } from "styled-components";
// import { fadeIn } from "react-animations";

// const fader = keyframes`
// 	from {
// 		opacity: 0;
//     transform: scale(1.2);
// 	}
// 	to {
// 		opacity: 1;
//     transform: scale(1);
// 	}
// `;

const GradientText = styled(Text)`
  background: linear-gradient(135deg, red, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default props => {
  return (
    <Flex column align="center" justify="center" py={3}>
      <Image w="100%" src="https://unsplash.it/1600/900?image=830" alt="" />
      New Land
    </Flex>
  );
};
