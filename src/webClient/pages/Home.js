import React from "react";
import Helmet from "react-helmet";
import { Heading, Flex, PageName, TopPage, Text, Box } from "../components";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const fader = keyframes`
	from {
		opacity: 0;
    transform: scale(1.2);
	}
	to {
		opacity: 1;
    transform: scale(1);
	}
`;

const StyledBox = styled(Flex)`
  opacity: 0;
  animation: ${fader} 2s 0.5s cubic-bezier(0.18, 0.98, 0.45, 1) forwards;
  will-change: transform, opacity;
`;

const ClipBox = styled(Box)`
  clip-path: polygon(0% 100%, 100% 100%, 92.3% 0%, 0% 0%);
  height: 20px;
`;

const GradientText = styled(Text)`
  background: linear-gradient(135deg, red, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default props => {
  return (
    <Flex column align="center" justify="center" py={3}>
      {props.match.path !== "/" ? (
        <Text>You need JS enabled to view this page</Text>
      ) : (
        <StyledBox column align="center" justify="center">
          <TopPage color="green" title="Home" />
          <GradientText w="25%">This is gradient text yo</GradientText>
        </StyledBox>
      )}
      <Box w="100%" bg="teal1">
        <ClipBox w="325px" bg="red2">
          Hey Hey Hey
        </ClipBox>
      </Box>
      <div
        style={{
          width: "100%",
          height: "20px",
          background: "red",
          clipPath: "url(#cliparrow)"
          // position: "absolute",
          // right: "0px",
          // top: "0px"
        }}
      >
        Hey Hey Hey
      </div>
      <svg
        height="0"
        width="0"
        // style={{ float: "left", position: "absolute", width: 0, height: 0 }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="cliparrow">
            <polygon points="0,0 0,20 325,20 300,0" />
          </clipPath>
        </defs>
      </svg>
      <div
        style={{
          width: "100%",
          height: "20px"
          // background: "red"
          // clipPath: "url(#cliparrow)"
          // position: "absolute",
          // right: "0px",
          // top: "0px"
        }}
      >
        <svg width="100%" height="100px" xmlns="http://www.w3.org/2000/svg">
          <g>
            <polygon points="0,0 0,20 325,20 300,0" />
            <text
              x="0"
              y="15"
              font-family="Verdana"
              font-size="20"
              fill="white"
            >
              Hey Hey Hey
            </text>
          </g>
        </svg>
        {/* <p style={{ position: "relative", color: "white" }}>Hey Hey Hey</p> */}
      </div>
    </Flex>
  );
};
