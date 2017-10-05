import React from "react";
import { Flex, TopPage, Text, Box, Image } from "../components";
import { Redirect } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Waypoint from "react-waypoint";
import { slideInRight } from "react-animations";

const slide = keyframes`${slideInRight}`;

const SlideText = styled(Text)`animation: 1s ${slide} alternate;`;

const SpacerBox = styled(Box)`height: 1000px;`;

const ClippedImage = styled(Image)`
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
`;

export default class WaypointComp extends React.Component {
  state = {
    waypoint: false
  };

  renderWayRoute = () => {
    if (this.state.waypoint) {
      return (
        <Redirect to="/waypoint/entered" />
        // <AnimatedRoute
        // to={`${this.props.location.pathname}/entered`}
        //   component={() => <Text>Entered Waypoint</Text>}
        //   location={this.props.location}
        // />
      );
    }
    return null;
  };

  render() {
    return (
      <Flex column align="center" justify="center" py={3}>
        <TopPage color="green" title="Waypoint" />
        <SpacerBox bg="teal5" w="100vw" />
        <Waypoint
          onEnter={() => {
            this.setState(() => ({ waypoint: true }));
          }}
        >
          <div>
            {this.renderWayRoute()}
            {this.state.waypoint && <SlideText>Entered</SlideText>}
            {/* <AnimatedRoute
              path="/waypoint/entered"
              component={() => <Text>Entered</Text>}
              location={this.props.location}
            /> */}
            <SpacerBox bg="red2" w="100vw">
              <ClippedImage
                w="100%"
                src="https://unsplash.it/1600/900?image=830"
                alt=""
              />
            </SpacerBox>
          </div>
        </Waypoint>
        <SpacerBox bg="yellow3" w="100vw" />
      </Flex>
    );
  }
}
