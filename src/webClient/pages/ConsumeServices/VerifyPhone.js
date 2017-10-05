import React from "react";
import { ServiceBox } from "./pageComponents";
import {
  Input,
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Border
} from "../../components";

export default ({ onFetch, verifyStatus }) => (
  <ServiceBox>
    {/* <Text>Dev</Text>
    <Text>Stage</Text> */}
    {/* <Text>Prod</Text> */}
    <Button
      onClick={() =>
        onFetch(
          `${process.env.REACT_APP_API_DOMAIN}/verifyphone/start`,
          null,
          "verifyphone"
        )}
    >
      Verify Phone
    </Button>
    <Text>
      Result from verify phone:
      {verifyStatus &&
        (verifyStatus === "success" ? (
          <Box>
            <Text>Enter Number you Received:</Text>
            <Input />
            <Button
              onClick={
                (() =>
                  onFetch(
                    `${process.env.REACT_APP_API_DOMAIN}/verifyphone/verify`
                  ),
                null,
                "verifyphone")
              }
            >
              Submit
            </Button>
          </Box>
        ) : verifyStatus === "true" ? (
          <Text>Verified</Text>
        ) : (
          <Text>
            There was an issue generating number, please try again and let us
            know if problem persists
          </Text>
        ))}
    </Text>
  </ServiceBox>
);
