require("dotenv").config();
const vision = require("@google-cloud/vision")({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GCLOUD_PROJECT
});
const { json } = require("micro");
const sendToSentry = require("micro-sentry");
const url =
  "https://a15b2d040d4a4d24b7f78953b837f273:b318a6ecf8c1479d9d590250e89d534e@sentry.io/211784";

module.exports = sendToSentry(url)(async (req, res) => {
  var allowedOrigins = [
    "https://bartender-penny-37517.netlify.com",
    "https://scientist-frog-67481.netlify.com"
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  if (req.method === "GET") {
    return "This was a GET request... ocr doh";
  }

  const { imageData, imageUrl } = await json(req);

  if (imageData) {
    var image = {
      content: imageData
    };
    const response = await vision.textDetection(image);
    const text =
      response &&
      response[0] &&
      response[0].fullTextAnnotation &&
      response[0].fullTextAnnotation.text;
    return text;
  } else if (imageUrl) {
    var image = {
      source: {
        imageUri: imageUrl
      }
      // languageHints: ["ko", "en"]
    };

    // const response = await vision.documentTextDetection(image);
    const response = await vision.textDetection(image);

    console.log(response);
    const text =
      response &&
      response[0] &&
      response[0].fullTextAnnotation &&
      response[0].fullTextAnnotation.text;
    return text;
  }
  return "error, You did not pass correct params of imageUrl or imageData";
});
