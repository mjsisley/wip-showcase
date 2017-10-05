import React from "react";
import { ServiceBox } from "./pageComponents";
import { Heading, Box, Text, Button, Flex, Border } from "../../components";

export default ({ onFetch, ocrStatus }) => (
  <ServiceBox>
    {/* <Text>Dev</Text>
    <Text>Stage</Text>
    <Text>Prod</Text> */}
    <Button onClick={() => onFetch(`${process.env.REACT_APP_API_DOMAIN}/ocr/`)}>
      OCR Service
    </Button>
    {/* <Text id="app.consume.ocr" values={{ ocrStatus: ocrStatus || null }}> */}
    <Text>Result from ocr: {ocrStatus}</Text>
  </ServiceBox>
);
