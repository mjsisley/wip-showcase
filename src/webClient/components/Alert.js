import React from "react";
import c from "lodash/capitalize";
import styled from "styled-components";
import { Background, H1, P } from "./Commons";

const Modal = styled.div`
  display: table;
  max-width: 400px;
  min-width: 350px;
  margin: 25vh auto;
  background-color: white;
  padding-bottom: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  color: #2196f3;
  font-size: 14px;
  height: 45px;
  box-sizing: border-box;
  font-weight: 500;
  padding: 12px 10px;
  float: right;
  text-transform: uppercase;
  outline: none;
  border: none;
  user-select: none;
  &:hover {
    background-color: #eee;
  }
`;

const Alert = ({ title, description, right, left }) =>
  <Background opacity={0.1}>
    <Modal>
      <H1>
        {c(title)}
      </H1>
      <P>
        {c(description)}
      </P>
      <footer style={{ padding: 8 }}>
        <Button onClick={right.action}>
          {right.title}
        </Button>
        <Button onClick={left.action}>
          {left.title}
        </Button>
      </footer>
    </Modal>
  </Background>;

Alert.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  right: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired
  }),
  left: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired
  })
};
export default Alert;
