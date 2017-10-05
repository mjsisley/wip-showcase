import React from "react";
import { TopPage, Modal, Teleport, Button, Text, Box } from "../../components";
import { PageControl, CaptureImage } from "./pageComponents";

const supported = "mediaDevices" in navigator;

class UploadPics extends React.Component {
  async componentDidMount() {
    if (supported) {
      const player = document.getElementById("player");
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const captureButton = document.getElementById("capture");

      const constraints = {
        video: true
      };

      captureButton.addEventListener("click", () => {
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
      });

      // Attach the video stream to the video element and autoplay.
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      player.srcObject = stream;
    }
  }

  componentWillUnmount() {
    if (supported) {
      const player = document.getElementById("player");
      player.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  render() {
    const props = this.props;
    return (
      <Box>
        <Text>Upload Pics</Text>
        <PageControl
          appPageNumber={props.appPageNumber}
          appLength={props.appLength}
          match={props.match}
          okayToProceed={true}
        />
        <CaptureImage />
        {supported &&
          <div>
            <video id="player" controls autoPlay />
            <button id="capture">Capture</button>
            <canvas id="canvas" width="320" height="240" />
          </div>}
      </Box>
    );
  }
}

export default UploadPics;
