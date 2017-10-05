import React from "react";
import { Box, Text, Small, Flex } from "../../components";
import styled from "styled-components";

const FooterText = styled(Text)`
color: white;
line-height: 1.5;
`;

const Footer = () =>
  <Box w="100vw">
    <Box bg="rgba(42, 45, 48, 1.0)" px={4} py={4}>
      <FooterText f={3} bold>
        This is a Footer
      </FooterText>
      <Small color="white">It is sticky</Small>
    </Box>
  </Box>;

export default Footer;
