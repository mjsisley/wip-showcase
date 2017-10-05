import React from "react";
import {
  TopPage,
  Modal,
  Teleport,
  Button,
  Text,
  Box,
  Flex
} from "../../components";
import { SignedUploader, UploadField } from "@mjsisley/upload";
import CaptureImage from "./CaptureImage";

class UploadPics extends React.Component {
  state = {};

  onFetch = () => {
    const component = this;
    console.log(component.state.imageUrl);
    fetch("/api/ocr/", {
      method: "POST",
      body: JSON.stringify({
        imageUrl: "https://s3.amazonaws.com/exampleapp/screenshot.jpg"
      })
    })
      .then(function(response) {
        console.log(response);
        return response.text();
      })
      .then(function(text) {
        console.log("parsed text: ", text);
        component.setState({ ocrResult: text });
      })
      .catch(function(ex) {
        console.log("parsing failed: ", ex);
      });
  };

  render() {
    const props = this.props;
    return (
      <Box>
        <TopPage title="Image Capture" color="violet" />
        {/* <input type="file" accept="image/*" /> */}
        <SignedUploader
          beforeRequest={({ files }) =>
            // TODO: Fetch from fileUpload and pass files along to get the urls
            // then make sure this resolves to an object with a generated url
            fetch("/api/fileUpload", {
              method: "POST",
              body: JSON.stringify({ fileName: "screenshot.jpg" })
            })
              .then(function(response) {
                return response.text();
              })
              .then(function(text) {
                // component.setState({ imageUrl: text });
                return { url: text };
              })}
          request={props => {
            const { before, files } = props;
            this.setState({ imageUrl: before.url });
            return {
              url: before.url,
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
          onComplete={props => {
            console.log(props);
            this.onFetch();
          }}
        >
          {({ onFiles, progress, complete }) => (
            <Box>
              <UploadField onFiles={onFiles} type="file" accept="image/*">
                Upload Image
              </UploadField>
              <CaptureImage onFiles={onFiles} />
              <Flex column align="center">
                {/* TODO: Progress should be fed to some pretty meter */}
                <Text>{progress ? `Progress: ${progress}` : null}</Text>
                {/* Pretty Complete message */}
                <Text>{complete ? "Complete!" : null}</Text>
              </Flex>
            </Box>
          )}
        </SignedUploader>
        <Text>
          {this.state.ocrResult && `OCR Results: ${this.state.ocrResult}`}
        </Text>
      </Box>
    );
  }
}

export default UploadPics;
