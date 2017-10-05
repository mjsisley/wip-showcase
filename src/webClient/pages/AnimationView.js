import React from "react";
import { Link } from "react-router-dom";
import { Flex, TopPage, Box, Heading } from "../components";
// import { Lottie } from "../app/appComponents";
import Lottie from "../app/appComponents/Lottie";
import ANIMATIONS from "../app/animations";

const AnimationView = ({ match }) => {
  const animation = ANIMATIONS[parseInt(match.params.id, 10)];
  if (!animation) {
    return <div>Image not found</div>;
  }

  return (
    <Box>
      <Heading>
        {animation.title}
      </Heading>
      <Lottie animationData={animation.data} />
    </Box>
  );
};

export default AnimationView;
