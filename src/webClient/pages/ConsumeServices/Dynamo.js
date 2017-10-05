import React from "react";
import { ServiceBox } from "./pageComponents";
import { Text, Button } from "../../components";

export default ({ onFetch, dynamoStatus }) => (
  <ServiceBox>
    <Text>Dev</Text>
    <Text>Stage</Text>
    {/* <Text>Prod</Text> */}

    <Button
      onClick={() => {
        onFetch(`${process.env.REACT_APP_API_DOMAIN}/dynamo/`, null, "dynamo");
      }}
    >
      DynamoDB
    </Button>
    <Text>Result from dynamo: {dynamoStatus}</Text>
  </ServiceBox>
);
