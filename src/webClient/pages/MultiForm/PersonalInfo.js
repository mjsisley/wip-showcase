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
import Toggle from "react-toggled";
import { connect } from "react-redux";
import auth from "../../auth/Auth";

const isFieldRequired = (val, name) =>
  val && typeof val === "string" && val.length > 0;

// const check = newValue =>
//   !isNaN(
//     newValue.replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
//   ) && newValue.length < 15;

const isEmail = string =>
  string.match(
    /^[-a-z0-9~!$%^&*_=+}{'?]+(.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(.[-a-z0-9_]+)*.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  );

const isPhone = string =>
  string.match(
    /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
  );

const formatPhone = string =>
  string
    .replace(" (", "")
    .replace(") ", "")
    .replace("-", "");

class PersonalInfo extends React.Component {
  state = {
    phone: this.props.phone || "",
    email: this.props.email || "",
    name: this.props.name || "",
    isEditing: false,
    triggerValidation: 0
  };

  async componentDidMount() {
    console.log(this.props);
    const { name, phone, email } = this.props;
    if (!name || !phone || !email) {
      const user = await auth.getInfo();
      console.log(user);
      if (!name && user.name) {
        this.setState({ name: user.name });
        this.props.dispatch({
          type: "FIELD_CHANGE",
          payload: {
            name: "name",
            value: user.name
          }
        });
      }
      if (!email && user.email) {
        this.setState({ email: user.email });
        this.props.dispatch({
          type: "FIELD_CHANGE",
          payload: {
            name: "email",
            value: user.email
          }
        });
      }
      if (!phone && user.phone) {
        this.setState({ phone: user.phone });
        this.props.dispatch({
          type: "FIELD_CHANGE",
          payload: {
            name: "phone",
            value: user.phone
          }
        });
      }
    }
  }

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

  handleValidation = () => {
    const { phone, email, name } = this.state;

    return isEmail(email) && isPhone(phone);
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

  render() {
    const { note, isEditing, triggerValidation } = this.state;
    console.log(this.props);

    return (
      <Box>
        <Text py={2}>Personal Info</Text>
        <Box py={1}>
          <FloatLabel
            title="Your Name"
            value={this.state.name}
            onChange={this.handleFieldChange("name")}
          />
        </Box>
        <Box py={1}>
          <FloatLabel
            title="Email"
            value={this.state.email}
            onChange={this.handleFieldChange("email")}
          />
        </Box>
        <Box py={1}>
          <Label>Phone Number</Label>
          <InputMask
            placeholder="Your Phone Number"
            mask="+1 (999) 999-9999"
            value={this.state.phone}
            onChange={this.handleFieldChange("phone")}
            alwaysShowMask
          />
        </Box>
        {/* <Toggle>
          {({ on, getTogglerProps }) =>
            <div>
              <button {...getTogglerProps()}>Toggle me</button>
              <div>
                {on ? "Toggled On" : "Toggled Off"}
              </div>
            </div>}
        </Toggle> */}
        <Button
          onClick={() => {
            this.handleValidation &&
              this.onFetch(
                "/api/notifications",
                JSON.stringify({
                  name: this.state.name,
                  email: this.state.email,
                  phone: formatPhone(this.state.phone)
                })
              );
          }}
        >
          Send Notification
        </Button>
        <PageControl
          appPageNumber={this.props.appPageNumber}
          appLength={this.props.appLength}
          match={this.props.match}
          okayToProceed={this.handleValidation()}
        />
      </Box>
    );
  }
}

export default connect(({ multiForm }) => ({
  name: multiForm.name,
  phone: multiForm.phone,
  email: multiForm.email
}))(PersonalInfo);
