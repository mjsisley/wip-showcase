import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import { spring, AnimatedSwitch } from "react-router-transition";
import { injectGlobal } from "styled-components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import MultiForm from "./index";

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  //   return spring(val, {
  //     stiffness: 330,
  //     damping: 22
  //   });
  return val;
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
};

export default props => {
  console.log(props);
  return (
    <AnimatedSwitch
      location={props.location}
      atEnter={bounceTransition.atEnter}
      atLeave={bounceTransition.atLeave}
      atActive={bounceTransition.atActive}
      mapStyles={mapStyles}
    >
      <Route path="/multiForm/1" {...props} component={MultiForm} />
      <Route path="/multiForm/2" {...props} component={MultiForm} />
    </AnimatedSwitch>
  );
};
//   <TransitionGroup>
//     <CSSTransition
//       key={props.location.key}
//       timeout={{ enter: 1000, exit: 0 }}
//       classNames="fade"
//     >
//       <Switch location={props.location}>
//         <Route path="/multiForm/1" {...props} component={MultiForm} />
//         <Route path="/multiForm/2" {...props} component={MultiForm} />
//       </Switch>
//     </CSSTransition>
//   </TransitionGroup>
// );

// // we need to map the `scale` prop we define below
// // to the transform style property
// function mapStyles(styles) {
//   return {
//     opacity: styles.opacity,
//     transform: `scale(${styles.scale})`
//   };
// }

// // wrap the `spring` helper to use a bouncy config
// function bounce(val) {
//   //   return spring(val, {
//   //     stiffness: 330,
//   //     damping: 22
//   //   });
//   return val;
// }

// // child matches will...
// const bounceTransition = {
//   // start in a transparent, upscaled state
//   atEnter: {
//     opacity: 0,
//     scale: 1.2
//   },
//   // leave in a transparent, downscaled state
//   atLeave: {
//     opacity: bounce(0),
//     scale: bounce(0.8)
//   },
//   // and rest at an opaque, normally-scaled state
//   atActive: {
//     opacity: bounce(1),
//     scale: bounce(1)
//   }
// };

// export default props => (
// //   <div>
// //     <AnimatedSwitch
// //       {...props}
// //       atEnter={bounceTransition.atEnter}
// //       atLeave={bounceTransition.atLeave}
// //       atActive={bounceTransition.atActive}
// //       mapStyles={mapStyles}
// //     >
// //       <Route path="/multiForm/1" {...props} component={MultiForm} />
// //       <Route path="/multiForm/2" {...props} component={MultiForm} />
// //     </AnimatedSwitch>
// //   </div>
// );

// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import { withRouter } from "react-router";
// import TransitionGroup from "react-transition-group/TransitionGroup";
// import Transition from "react-transition-group/Transition";
// import styled from "styled-components";
// import MultiForm from "./index";
// import {
//   Heading,
//   Flex,
//   PageName,
//   TopPage,
//   Text,
//   Button,
//   Box,
//   Input,
//   BackgroundImage,
//   Absolute
// } from "../../components";
// import { AnimatedRoute } from "react-router-transition";

// function getPathDepth(location) {
//   let pathArr = (location || {}).pathname.split("/");
//   pathArr = pathArr.filter(n => n !== "");
//   return pathArr.length;
// }

// class WrappedMultiForm extends React.Component {
//   //   constructor(props, context) {
//   //     super(props, context);
//   //     this.state = {
//   //       prevDepth: getPathDepth(props.location)
//   //     };
//   //   }

//   //   componentWillReceiveProps() {
//   //     console.log("prev:", getPathDepth(this.props.location));
//   //     this.setState({ prevDepth: getPathDepth(this.props.location) });
//   //   }

//   state = {
//     prevAppPageNumber: 0,
//     appPageNumber: 1
//   };

//   componentDidMount() {
//     const appPageNumber =
//       Number(this.props.location.pathname.split("/").slice(-1)[0]) || 1;
//     this.setState({
//       prevAppPageNumber: appPageNumber - 1,
//       appPageNumber: appPageNumber
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     const appPageNumber =
//       Number(nextProps.location.pathname.split("/").slice(-1)[0]) || 1;
//     this.setState({
//       prevAppPageNumber: this.state.appPageNumber,
//       appPageNumber
//     });
//   }

//   render() {
//     const { appPageNumber, prevAppPageNumber } = this.state;
//     // const page = application[appPageNumber - 1];
//     // const Component = page.component;
//     const slideDirection = prevAppPageNumber > appPageNumber ? "left" : "right";
//     return (
//       <AnimatedRoute
//         path="/multiForm/:n"
//         component={MultiForm}
//         atEnter={{ offset: 100 }}
//         atLeave={{ offset: -100 }}
//         atActive={{ offset: 0 }}
//         mapStyles={styles => ({
//           transform: `translateX(${styles.offset}%)`
//         })}
//       />

//       //   <Route
//       //     render={({ location }) => {
//       //       return (
//       //         <TransitionGroup>
//       //           <Transition
//       //             key={location.key}
//       //             timeout={500}
//       //             mountOnEnter={true}
//       //             unmountOnExit={true}
//       //           >
//       //             {status => (
//       //               <Switch key={location.key} location={location}>
//       //                 <Route
//       //                   location={location}
//       //                   key={location.key}
//       //                   path="/multiForm/:n"
//       //                   render={props => (
//       //                     <MultiForm
//       //                       className={`fade fade-${status}`}
//       //                       direction={slideDirection}
//       //                       {...props}
//       //                     />
//       //                   )}
//       //                 />}
//       //               </Switch>
//       //             )}
//       //           </Transition>
//       //         </TransitionGroup>
//       //       );
//       //     }}
//       //   />
//     );
//   }
// }

// export default withRouter(WrappedMultiForm);
