import React from "react";
import { FormattedMessage, FormattedDate } from "react-intl";
import { withRouter } from "react-router";
import { Text, Box, Button, Flex, TopPage } from "../../components";
import { connect } from "react-redux";
import { updateIntl } from "react-intl-redux";
// TODO: Code split out the locales
import en from "../../app/intlMessages/en";
// import intlMessages from "../../app/intlMessages";

const Intl = props => {
  const handleLocaleChange = locale => {
    if (locale === "en") {
      props.dispatch(updateIntl({ locale, messages: en }));
    }
    if (locale === "es") {
      import("../../app/intlMessages/es").then(messages => {
        props.dispatch(updateIntl({ locale, messages: messages.default }));
      });
    }
    if (locale === "zh") {
      import("../../app/intlMessages/zh").then(messages => {
        console.log(messages);
        props.dispatch(updateIntl({ locale, messages: messages.default }));
      });
    }
  };

  return (
    <Flex column align="center" justify="center" py={3}>
      <TopPage title="Intl" color="blue" />
      <Text id="app.language" is="em" bold />
      <Text>
        Today is <FormattedDate value={Date.now()} />
      </Text>
      <Flex>
        <Button onClick={() => handleLocaleChange("en")}>English</Button>
        <Button onClick={() => handleLocaleChange("es")}>Spanish</Button>
        <Button onClick={() => handleLocaleChange("zh")}>Chinese</Button>
      </Flex>
    </Flex>
  );
};

export default withRouter(connect()(Intl));
