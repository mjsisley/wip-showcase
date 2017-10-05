import React from "react";
import { ServiceBox } from "./pageComponents";
import { Heading, Box, Text, Button, Flex, Border } from "../../components";
import { SignedUploader, UploadField } from "@mjsisley/upload";

export default ({ onFetch, fileUploadStatus }) => (
  <ServiceBox>
    <Text>Dev</Text>
    <Text>Stage</Text>
    {/* <Text>Prod</Text> */}

    {/* TODO: Need to modify everyting to handle multiple files at once */}
    <SignedUploader
      beforeRequest={({ files }) =>
        // TODO: Fetch from fileUpload and pass files along to get the urls
        // then make sure this resolves to an object with a generated url
        fetch(
          `${process.env.REACT_APP_API_DOMAIN}/fileupload`,
          {
            method: "POST",
            body: JSON.stringify({ fileName: "screenshot.jpg" })
          },
          "fileupload"
        )
          .then(function(response) {
            return response.text();
          })
          .then(function(text) {
            return { url: text };
          })}
      request={({ before, files }) => {
        return {
          url: before.url,
          // Body: blobData,
          method: "PUT",
          headers: {
            "Content-Type": files[0].type
          }
        };
      }}
      afterRequest={({ before, status }) =>
        new Promise(resolve => {
          resolve("finished the upload!");
        })}
      uploadOnSelection={true}
    >
      {({ onFiles, progress, complete }) => (
        <Box>
          <UploadField onFiles={onFiles}>
            <Button>File Upload Service</Button>
          </UploadField>
          <Flex column align="center">
            <Text>Result from File Upload: {fileUploadStatus}</Text>
            {/* TODO: Progress should be fed to some pretty meter */}
            <Text>{progress ? `Progress: ${progress}` : null}</Text>
            {/* Pretty Complete message */}
            <Text>{complete ? "Complete!" : null}</Text>
          </Flex>
        </Box>
      )}
    </SignedUploader>
  </ServiceBox>
);
