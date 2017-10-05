import React from "react";
import {
  Input,
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Border,
  PageName,
  TopPage,
  ScrollToTopOnMount
} from "../../components";
import VerifyPhone from "./VerifyPhone";
import Notifications from "./Notifications";
import FileUpload from "./FileUpload";
import Payments from "./Payments";
import Dynamo from "./Dynamo";
import VIN from "./VIN";
// import OCR from "./OCR";
// import Authentication from "./Authentication";


export default class extends React.Component {
  state = {};
  onFetch = (route, data = null, stateKey = "notSet") => {
    const component = this;

    if (data) {
      fetch(route, {
        method: "POST",
        body: data
      })
        .then(function(response) {
          return response.text();
        })
        .then(function(text) {
          const splitRoute = route.split("/");
          component.setState({ [stateKey]: text });
        })
        .catch(function(ex) {
          console.log("parsing failed: ", ex);
        });
    } else {
      fetch(route, { method: "GET" })
        .then(function(response) {
          return response.text();
        })
        .then(function(text) {
          const splitRoute = route.split("/");
          component.setState({ [stateKey]: text });
        })
        .catch(function(ex) {
          console.log("parsing failed: ", ex);
        });
    }
  };

  render() {
    return (
      <Box w="100%">
        <TopPage title="Consume Services" color="teal3" />
        <ScrollToTopOnMount />
        <Flex align="center" column>
          <Notifications
            onFetch={this.onFetch}
            notificationsStatus={this.state.notifications}
          />
          <Payments
            onFetch={this.onFetch}
            paymentsStatus={this.state.payments}
          />
          <VIN onFetch={this.onFetch} VINStatus={this.state.VIN} />
          <FileUpload
            onFetch={this.onFetch}
            fileUploadStatus={this.state.fileupload}
          />
          <Dynamo onFetch={this.onFetch} dynamoStatus={this.state.dynamo} />
          {/* <VerifyPhone
            onFetch={this.onFetch}
            verifyStatus={this.state.verifyphone}
          /> */}
          {/* <OCR onFetch={this.onFetch} ocrStatus={this.state.ocr} /> */}
          {/* <Authentication history={this.props.history} /> */}
        </Flex>
      </Box>
    );
  }
}
