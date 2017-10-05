import React from "react";
import { injectGlobal, keyframes } from "styled-components";

const colorTransition = keyframes`
  from {
    color: green;
  }
  to {
    color: white;
  }
`;

injectGlobal`    
.wrapper {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 300px;
    margin-top: 40px;
  }
      
  .wrapper > label {
    position: absolute;
    top: -13px;
    left: 0;
    font-size: 11px;
    color: blue;
    transition: all 0.2s linear;
    opacity: 0;
    font-weight: bold;
  }
  
  .wrapper > label.on {
    opacity: 1;
    color: #243b6b;
  }
`;

export default class FloatLabel extends React.Component {
  // Set name to display in React tools
  displayName = "Input";
  state = { className: "" };

  componentDidMount() {
    this.props.value && this.setState({ className: "on" });
  }

  // Check if input is present
  handleChange = event => {
    if (event.target.value !== "") {
      this.setState({ className: "on" });
    } else {
      this.setState({ className: "" });
    }
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  };

  render() {
    return (
      <div className={`wrapper ${this.state.className}`}>
        <label className={`label ${this.state.className}`}>
          {this.props.title}
        </label>
        <input
          placeholder={this.props.title}
          value={this.props.value}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
        />
      </div>
    );
  }
}
