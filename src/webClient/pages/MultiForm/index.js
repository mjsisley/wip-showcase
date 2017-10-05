import React from "react";
import {
  Heading,
  Flex,
  PageName,
  TopPage,
  Text,
  Button,
  Box,
  Input,
  BackgroundImage,
  Absolute
} from "../../components";
import Login from "./Login";
import VerifyPhone from "./VerifyPhone";
import PersonalInfo from "./PersonalInfo";
import UploadPics from "./UploadPics";
import AutofillVIN from "./AutofillVIN";
import Payment from "./Payment";
import CoveragePick from "./CoveragePick";
import { PageControl } from "./pageComponents";
// import {
//   slideInRight,
//   slideInLeft,
//   slideOutRight,
//   slideOutLeft
// } from "react-animations";
import styled, { keyframes, injectGlobal } from "styled-components";
import imgCurrent from "./currentImage.png";
import imgPrev from "./prevImage.png";

// import TransitionGroup from "react-transition-group/TransitionGroup";
// import Transition from "react-transition-group/Transition";

// // const slideFromRight = keyframes`${slideInRight}`;
// // const slideFromLeft = keyframes`${slideInLeft}`;
// // const slideToRight = keyframes`${slideOutRight}`;
// // const slideToLeft = keyframes`${slideOutLeft}`;

// const fadeEntering = "fade-entering";
// const fadeEntered = "fade-entered";
// const fadeExiting = "fade-exiting";
// const fadeExited = "fade-exited";

// const TransitionDiv = styled(Flex).attrs({
//   fadeEntering,
//   fadeEntered,
//   fadeExiting,
//   fadeExited
// })`
//   width: 100%;

//   &.${fadeEntering} {
//     transform: ${props => {
//       console.log(props);
//       return props.direction === "left"
//         ? "translate3d(-100%, 0, 0)"
//         : "translate3d(100%, 0, 0)";
//     }}
//   }
//   &.${fadeEntered} {
//     transform: translate3d(0%, 0, 0);
//     transition: transform 650ms ease-in;
//   }
//   &.${fadeExiting} {
//     transform: transform: ${props =>
//       props.direction === "left"
//         ? "translate3d(100%, 0, 0)"
//         : "translate3d(-100%, 0, 0)"};
//     transition: transform 650ms ease-out;
//   }
//   &.${fadeExited} {
//     transform: ${props =>
//       props.direction === "left"
//         ? "translate3d(100%, 0, 0)"
//         : "translate3d(-100%, 0, 0)"};
//   }
// `;

// const SlideBox = styled(Flex)`
//   ${props =>
//     props.intro &&
//     `animation: 1s
//   ${props => (props.direction === "left" ? slideFromLeft : slideFromRight)}
//   alternate;`};
//   will-change: transform;
//   ${props =>
//     props.outro &&
//     `animation: 1s ${props.direction === "left"
//       ? slideToRight
//       : slideToLeft}} alternate`};
// `;
const ClipBox = styled(Flex)`
  clip-path: polygon(0% 100%, 83.15% 100%, 100% 0%, 16.85% 0%);
  height: 90vh;
`;

const StyledBackgroundImage = styled(BackgroundImage)`height: 90vh;`;

const application = [
  {
    title: "Payment Info",
    component: Payment,
    prevImage: imgPrev,
    currentImage: imgCurrent
  },
  {
    title: "Coverage Pick",
    component: CoveragePick,
    prevImage: imgCurrent,
    currentImage: imgPrev
  },
  {
    title: "Create Acct. w/ Partner",
    component: Login
  },
  {
    title: "Personal Info (should create linked account) + Notifications",
    component: PersonalInfo
  },
  {
    title: "Verify Phone",
    component: VerifyPhone
  },
  {
    title: "Upload Pics",
    component: UploadPics
  },
  {
    title: "Autofill on VIN",
    component: AutofillVIN
  }
];

export default class MultiForm extends React.Component {
  state = {
    prevAppPageNumber: 0,
    appPageNumber: 1
  };

  componentDidMount() {
    const appPageNumber =
      Number(this.props.location.pathname.split("/").slice(-1)[0]) || 1;
    this.setState({
      prevAppPageNumber: appPageNumber - 1,
      appPageNumber: appPageNumber
    });
  }

  componentWillReceiveProps(nextProps) {
    const appPageNumber =
      Number(nextProps.location.pathname.split("/").slice(-1)[0]) || 1;
    this.setState({
      prevAppPageNumber: this.state.appPageNumber,
      appPageNumber
    });
  }

  render() {
    const { appPageNumber, prevAppPageNumber } = this.state;
    const page = application[appPageNumber - 1];
    const Component = page.component;
    const slideDirection = prevAppPageNumber > appPageNumber ? "left" : "right";

    return (
      <Flex w="100%" p={0} m={0}>
        {/* <SlideBox
          direction={slideDirection}
          key={page.title}
          outro={this.state.outro}
          intro={this.state.intro}
          w="100%"
        > */}
        {/* <TransitionGroup
          style={{ width: "100vw", height: "100vh", padding: 0, margin: 0 }}
        >
          <Transition
            key={page.title}

            timeout={{ enter: 0, exit: 650 }}
            mountOnEnter={true}
            unmountOnExit={true}
          > */}
        {/* {status => {
              console.log(status);
              if (status === "exited") {
                return null;
              } */}
        {/* 
              return (
                <TransitionDiv
                  className={`fade fade-${status}`}
                  direction={slideDirection}
                  key={page.title}
                  w="100%"
                > */}
        <StyledBackgroundImage
          src={page.prevImage}
          w="50vw"
          ratio={3 / 4}
          p={0}
          m={0}
        />
        <StyledBackgroundImage
          src={page.currentImage}
          w="50vw"
          ratio={3 / 4}
          p={0}
          m={0}
        />
        {/* </TransitionDiv>
              );
            }}
          </Transition>
        </TransitionGroup> */}
        <Absolute ml="20%" w="100%">
          {/* <TopPage color="pink" title="MultiForm" /> */}
          <Flex align="center" justify="center" column py={3} w="50%">
            <ClipBox
              bg="green2"
              w="100%"
              column
              align="center"
              justify="center"
            >
              {/* <SlideBox
                direction={slideDirection}
                key={page.title}
                outro={this.state.outro}
                intro={this.state.intro}
                bg="green2"
                w="100%"
                column
                align="center"
                justify="center"
              > */}
              {/* <TransitionGroup>
                <Transition
                  key={page.title}
                  timeout={300}
                  mountOnEnter={true}
                  unmountOnExit={true}
                >
                  {status => (
                    <TransitionDiv
                      className={`fade fade-${status}`}
                      direction={slideDirection}
                      key={page.title}
                    > */}
              <Text is="h3">{page.title}</Text>
              {Component ? (
                <Component
                  history={this.props.history}
                  appPageNumber={appPageNumber}
                  appLength={application.length}
                  match={this.props.match}
                />
              ) : (
                <Box is="ul" py={4} style={{ listStyleType: "none" }}>
                  {page.fields.map(field => (
                    <Box is="li" py={2}>
                      {field}
                      <Input placeholder={field.title} />
                    </Box>
                  ))}
                </Box>
              )}
              {/* </TransitionDiv>
                  )}
                </Transition>
              </TransitionGroup> */}
              {/* </SlideBox> */}
            </ClipBox>
          </Flex>
          <Text>Page Number for Progress Bar: {appPageNumber}</Text>
        </Absolute>
      </Flex>
    );
  }
}
