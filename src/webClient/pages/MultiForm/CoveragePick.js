import React from "react";
import { Box, Group, Button, ButtonOutline } from "../../components";
import { PageControl } from "./pageComponents";
import { connect } from "react-redux";

class Login extends React.Component {
  state = { coverageLevel: this.props.coverageLevel || "low" };

  handleButtonClick = coverageLevel => {
    this.setState({ coverageLevel });
  };

  renderButton = props =>
    props.name === this.state.coverageLevel ? (
      <Button onClick={() => this.handleButtonClick(props.name)}>
        {props.name}
      </Button>
    ) : (
      <ButtonOutline onClick={() => this.handleButtonClick(props.name)}>
        {props.name}
      </ButtonOutline>
    );

  render() {
    const props = this.props;
    return (
      <Box>
        <Group>
          {this.renderButton({ name: "low" })}
          {this.renderButton({ name: "medium" })}
          {this.renderButton({ name: "high" })}
        </Group>
        <PageControl
          appPageNumber={props.appPageNumber}
          appLength={props.appLength}
          match={props.match}
          // okayToProceed={auth.isAuthenticated()}
          okayToProceed={true}
        />
      </Box>
    );
  }
}

export default connect()(Login);
