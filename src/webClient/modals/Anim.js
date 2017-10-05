import React from "react";
import { TopPage, Modal, Teleport, Heading } from "../components";
// import { Lottie } from "../app/appComponents";
import Lottie from "../app/appComponents/Lottie";
import ANIMATIONS from "../app/animations";

const AnimModal = ({ match, history }) => {
  const animation = ANIMATIONS[parseInt(match.params.id, 10)];
  if (!animation) {
    return null;
  }
  const back = e => {
    // e.stopPropagation();
    history.goBack();
  };
  Teleport.init(
    <Modal onClick={back}>
      <Heading>
        {animation.title}
      </Heading>
      <Lottie animationData={animation.data} />
    </Modal>
  );
  return null;
};

export default AnimModal;
