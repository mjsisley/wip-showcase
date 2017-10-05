import React from "react";
import styled from "styled-components";
import Text from "./Text";

const PageText = styled(Text)`
    &::before,
    &::after {
    content: ' ';
    }
`;

const PageName = props => {
  return (
    <PageText
      id={`app.pageTitle.${props.title || props.children}`}
      defaultMessage={" {title} "}
      values={{ title: props.title || props.children }}
      {...props}
    />
  );
};

export default PageName;
