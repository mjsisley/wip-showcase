import React from "react";
import { Flex, Button } from "../../../components";
import LinkButton from "./LinkButton";

const PageControl = ({
  appPageNumber,
  appLength,
  match,
  okayToProceed,
  outro,
  intro
}) => {
  return (
    <Flex align="center" justify="center" py={3}>
      {appPageNumber !== 1 && (
        <LinkButton to={`${match.url}/${appPageNumber - 1}`}>
          Previous
        </LinkButton>
      )}
      {appPageNumber !== appLength &&
        (okayToProceed ? (
          <LinkButton to={`${match.url}/${appPageNumber + 1}`}>Next</LinkButton>
        ) : (
          <Button
            onClick={() => {
              alert("You need to do more things before proceeding");
            }}
          >
            Next
          </Button>
        ))}

      {appPageNumber === appLength && (
        <Button
          onClick={() => {
            alert("This submits everything");
          }}
        >
          Submit Application
        </Button>
      )}
    </Flex>
  );
};

export default PageControl;
