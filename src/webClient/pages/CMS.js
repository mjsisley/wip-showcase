import React from "react";
import Helmet from "react-helmet";
import { Heading, Flex, PageName, TopPage, Text, Box } from "../components";
import styled, { keyframes } from "styled-components";
import client from "../cms";

export default class CMS extends React.Component {
  state = {};

  async componentDidMount() {
    const entry = await client.getEntry("1kON93x2j2mgaSCygCIOck");
    this.setState({ field: entry.fields.sample1 });
  }

  render() {
    return (
      <Text>
        This is a thing...
        {this.state.field}
      </Text>
    );
  }
}
