import React from "react";
import { ServiceBox } from "./pageComponents";
import { Heading, Box, Text, Button, Flex, Border } from "../../components";

export default ({ onFetch, notificationsStatus }) => (
  <ServiceBox>
    <Text>Dev</Text>
    <Text>Stage</Text>
    {/* <Text>Prod</Text> */}
    <Button
      onClick={() =>
        onFetch(
          `${process.env.REACT_APP_API_DOMAIN}/notifications/`,
          JSON.stringify({
            name: "Matthew",
            phone: "+12067660137",
            email: "tcsisley@gmail.com"
          }),
          "notifications"
        )}
    >
      Notifications Service
    </Button>
    <Text
      id="app.consume.notifications"
      values={{ notificationsStatus: notificationsStatus || null }}
    />
  </ServiceBox>
);
