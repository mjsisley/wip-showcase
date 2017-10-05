import styled from "styled-components";
import { Header } from "../app/appComponents";
import { Container, Flex, Box } from "@mjsisley/rebass";

// These styles are for a sticky footer
export default styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100vw;
  > ${Flex} {
    flex: 1 0 auto;
    flex-direction: column;
  }
`;
