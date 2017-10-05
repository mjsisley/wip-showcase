import React from "react";
import { TopPage, Modal, Teleport, Button, Text } from "../components";
import auth from "../auth/Auth";
import { AuthSection } from "../app/appComponents";

const AuthModal = ({ history }) => {
  const back = e => {
    // e.stopPropagation();
    history.goBack();
  };

  Teleport.init(
    <Modal onClick={back}>
      <TopPage title="Auth" color="magenta" />
      <AuthSection history={history} auth={auth} />
    </Modal>
  );
  return null;
};

export default AuthModal;
