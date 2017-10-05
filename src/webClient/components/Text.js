import React from "react";
import { Text } from "@mjsisley/rebass";
import { injectIntl } from "react-intl";

const FormattedText = ({
  id,
  intl,
  values,
  description,
  defaultMessage,
  ...props
}) => {
  const formatMessageParam1 = { id, description, defaultMessage };
  const formatMessageParam2 = values;
  return (
    <Text {...props}>
      {(id && intl.formatMessage(formatMessageParam1, formatMessageParam2)) ||
        props.children}
    </Text>
  );
};

export default injectIntl(FormattedText);
