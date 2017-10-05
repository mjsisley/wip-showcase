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

const supported = "mediaDevices" in navigator;

class UploadPics extends React.Component {
  state = {};

  async componentDidMount() {
    if (supported) {
      const player = document.getElementById("player");
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const captureButton = document.getElementById("capture");

      const constraints = {
        video: { facingMode: "environment" }
      };

      const component = this;
      captureButton.addEventListener("click", () => {
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        // const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var dataUrl = canvas.toDataURL("image/jpeg");
        var blobData = dataURItoBlob(dataUrl);
        component.props.onFiles([blobData]);
      });
      // Attach the video stream to the video element and autoplay.
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        player.srcObject = stream;
      });
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
        {supported &&
          <div>
            <video id="player" controls autoPlay />
            <button id="capture">Capture</button>
            <canvas id="canvas" width="320" height="240" />
          </div>}
        <Text>
          {this.state.imageUrl && `File Upload Results: ${this.state.imageUrl}`}
        </Text>
      </Box>
    );
  }
}

export default UploadPics;

function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(",")[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}
