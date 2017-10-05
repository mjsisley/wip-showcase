import React from "react";
import { TopPage, Modal, Teleport, Button, Text, Box } from "../../components";
import { PageControl } from "./pageComponents";
const Autofill = props =>
  <Box>
    <Text>Autofill</Text>
    <PageControl
      appPageNumber={props.appPageNumber}
      appLength={props.appLength}
      match={props.match}
      okayToProceed={true}
    />
  </Box>;

export default Autofill;
