import React from "react";
import { Box, Heading } from "@mjsisley/rebass";
import Helmet from "react-helmet";
import PageName from "./PageName";

export default props => (
  <Box>
    <Helmet title={props.title} />
    <Heading>
      This is the
      <PageName is="strong" bold color={props.color || "red"}>
        {props.title}
      </PageName>
      view.
    </Heading>
  </Box>
);
