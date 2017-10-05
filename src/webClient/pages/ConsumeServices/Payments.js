import React from "react";
import { ServiceBox } from "./pageComponents";
import { Text, Button } from "../../components";

export default ({ onFetch, paymentsStatus }) => (
  <ServiceBox>
    <Text>Dev</Text>
    <Text>Stage</Text>
    {/* <Text>Prod</Text> */}
    <Button
      onClick={() =>
        onFetch(
          `${process.env.REACT_APP_API_DOMAIN}/payments/`,
          null,
          "payments"
        )}
    >
      Payments Service
    </Button>
    <Text>Result from payments: {paymentsStatus}</Text>
  </ServiceBox>
);
