import React from "react";
import {
  Heading,
  Box,
  Button,
  Border,
  PageName,
  TopPage,
  Teleport,
  Modal,
  Alert
} from "../../components";

const openModal = () => Teleport.init(<Modal>Some text</Modal>);

const alertProps = {
  title: "Hi",
  description: "Some text",
  right: {
    title: "ok",
    action: () => Teleport.clear()
  },
  left: {
    title: "cancel",
    action: () => Teleport.clear()
  }
};

const openAlert = () => Teleport.init(<Alert {...alertProps} />);

export default props => {
  return (
    <Border p={5} m={3}>
      <Box>
        <Button onClick={openModal}>Open Modal</Button>
        <Button onClick={openAlert}>Open Alert</Button>
      </Box>
    </Border>
  );
};
