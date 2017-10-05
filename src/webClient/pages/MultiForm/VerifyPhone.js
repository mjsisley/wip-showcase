import React from "react";
import {
  TopPage,
  Modal,
  Teleport,
  Button,
  Text,
  Box,
  Input,
  InputMask,
  Label,
  Flex
} from "../../components";
import { PageControl } from "./pageComponents";

const formatPhone = string =>
  string.replace(" (", "").replace(") ", "").replace("-", "");

class VerifyPhone extends React.Component {
  state = { phone: "", verify: "" };

  handlePhoneChange = event => {
    this.setState({ phone: event.target.value });
  };

  handleVerifyChange = event => {
    this.setState({ verify: event.target.value });
  };

  onFetch = (route, data = {}) => {
    {
      const component = this;

      fetch(
        route,
        data
          ? {
              method: "POST",
              body: data
            }
          : { method: "GET" }
      )
        .then(function(response) {
          console.log(response);
          return response.text();
        })
        .then(function(text) {
          console.log("parsed text: ", text);
          component.setState({ [route.split("/")[2]]: text });
        })
        .catch(function(ex) {
          console.log("parsing failed: ", ex);
        });
    }
  };

  render() {
    const props = this.props;
    return (
      <Box>
        {this.state.verifyPhone !== "success" &&
          this.state.verifyPhone !== "true" &&
          <Flex py={2} column>
            <Label>Phone Number</Label>
            <InputMask
              placeholder="Your Phone Number"
              mask="+1 (999) 999-9999"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              alwaysShowMask
            />
            <Button
              onClick={() => {
                this.onFetch(
                  "/api/verifyPhone/start",
                  JSON.stringify({
                    phone: formatPhone(this.state.phone)
                  })
                );
              }}
            >
              Verify Phone
            </Button>
          </Flex>}
        <Text>
          Result from verify phone:
          {this.state.verifyPhone &&
            (this.state.verifyPhone === "success"
              ? <Box>
                  <Text>Enter Number you Received:</Text>
                  <InputMask
                    placeholder="Verification Number"
                    mask="99999"
                    value={this.state.verify}
                    onChange={this.handleVerifyChange}
                    alwaysShowMask
                  />
                  <Button
                    onClick={() => {
                      this.onFetch(
                        "/api/verifyPhone/verify",
                        JSON.stringify({
                          phone: formatPhone(this.state.phone),
                          verifyNumber: this.state.verify
                        })
                      );
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              : this.state.verifyPhone === "true"
                ? <Text>Verified</Text>
                : <Text>
                    {console.log(this.state.verifyPhone)}
                    There was an issue generating number, please try again and
                    let us know if problem persists
                  </Text>)}
        </Text>
        <PageControl
          appPageNumber={props.appPageNumber}
          appLength={props.appLength}
          match={props.match}
          okayToProceed={this.state.verifyPhone === "true"}
        />
      </Box>
    );
  }
}

export default VerifyPhone;
