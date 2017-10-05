import React from "react";
import {
  TopPage,
  Modal,
  Teleport,
  Button,
  Text,
  Box,
  Input,
  Label,
  InputMask,
  FloatLabel
} from "../../components";
import { PageControl } from "./pageComponents";
import Cards from "react-credit-cards";
import { connect } from "react-redux";
import "react-credit-cards/lib/styles-compiled.css";

class Payment extends React.Component {
  state = {
    name: this.props.name || "",
    cvc: this.props.cvc || "",
    number: this.props.number || "",
    expiry: this.props.expiry || ""
  };

  handleFieldChange = fieldName => event => {
    this.setState({
      [fieldName]: (event.target && event.target.value) || event
    });
    this.props.dispatch({
      type: "FIELD_CHANGE",
      payload: {
        name: fieldName,
        value: (event.target && event.target.value) || event
      }
    });
  };

  handleOnFocus = fieldName => event => {
    this.setState({
      focused: fieldName
    });
  };

  render() {
    const props = this.props;
    return (
      props.rehydrated && (
        <Box>
          <Text>Payment</Text>
          <Cards
            cvc={this.state.cvc}
            name={this.state.name}
            number={this.state.number}
            expiry={this.state.expiry}
            focused={this.state.focused}
          />
          <Box py={1}>
            <FloatLabel
              title="Number"
              value={this.state.number}
              onChange={this.handleFieldChange("number")}
              onFocus={this.handleOnFocus("number")}
            />
          </Box>
          <Box py={1}>
            <FloatLabel
              title="Your Name"
              value={this.state.name}
              onChange={this.handleFieldChange("name")}
              onFocus={this.handleOnFocus("name")}
            />
          </Box>
          <Box py={1}>
            <FloatLabel
              title="Expiration Date"
              value={this.state.expiry}
              onChange={this.handleFieldChange("expiry")}
              onFocus={this.handleOnFocus("expiry")}
            />
          </Box>
          <Box py={1}>
            <FloatLabel
              title="CVC"
              value={this.state.cvc}
              onChange={this.handleFieldChange("cvc")}
              onFocus={this.handleOnFocus("cvc")}
            />
          </Box>
          <PageControl
            appPageNumber={props.appPageNumber}
            appLength={props.appLength}
            match={props.match}
            okayToProceed
          />
        </Box>
      )
    );
  }
}

export default connect(({ multiForm }) => ({
  ...multiForm
}))(Payment);
