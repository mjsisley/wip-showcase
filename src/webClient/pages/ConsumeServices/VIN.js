import React from "react";
import { ServiceBox } from "./pageComponents";
import { Text, Button } from "../../components";

export default ({ onFetch, VINStatus }) => (
  <ServiceBox>
    <Text>Dev</Text>
    <Text>Stage</Text>
    {/* <Text>Prod</Text> */}
    <Button
      onClick={() => {
        const VIN = "5UXWX7C5*BA";
        onFetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${VIN}?format=json`,
          null,
          "VIN"
        );
      }}
    >
      VIN Autofill
    </Button>
    <Text>Result from autofill: {VINStatus}</Text>
  </ServiceBox>
);
