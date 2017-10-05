require("dotenv").config();
const aws = require("aws-sdk");
var utf8 = require("utf8");
const { json } = require("micro");
const sendToSentry = require("micro-sentry");
const url =
  "https://a15b2d040d4a4d24b7f78953b837f273:b318a6ecf8c1479d9d590250e89d534e@sentry.io/211784";

aws.config.update({
  accessKeyId: utf8.encode(process.env.AWS_KEY),
  secretAccessKey: utf8.encode(process.env.AWS_SECRET),
  region: "us-east-1"
});

var s3 = new aws.S3({ signatureVersion: "v4" });

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
    return "This was a GET request... fileUpload doh, staging y'all";
  }

  const { fileName } = await json(req);

  if (fileName) {
    // TODO: username needs to be used as part of path to file (user can only upload to own folder)
    // const fileType = '"image/jpeg"';

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Expires: 300
      // ContentType: fileType,
      // Body: "",
      // ACL: "authenticated-read"
    };
    return s3.getSignedUrl("putObject", params);
  }
  return "error, You need to pass a file name";
});
