require("dotenv").config();
const aws = require("aws-sdk");
const sendToSentry = require("micro-sentry");
const url =
  "https://a15b2d040d4a4d24b7f78953b837f273:b318a6ecf8c1479d9d590250e89d534e@sentry.io/211784";

const dbName = `ExampleApp-${process.env.STAGE !== "DEV"
  ? process.env.STAGE
  : `${process.env.STAGE}4`}`;

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const dynamodb = new aws.DynamoDB({
  region: process.env.STAGE === "DEV" ? "aws-us-west-2" : "us-east-1",
  endpoint: process.env.DATABASE_ENDPOINT
});

try {
  var params = {
    AttributeDefinitions: [
      {
        AttributeName: "CustomerId",
        AttributeType: "S"
      }
    ],
    KeySchema: [
      {
        AttributeName: "CustomerId",
        KeyType: "HASH"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: dbName
  };
  dynamodb.createTable(params, function(err, data) {
    if (err) {
    } else
      // console.log(err, err.stack); // an error occurred
      console.log(data); // successful response
  });
} catch (e) {
  // console.log(e);
}

const dynamoClient =
  process.env.STAGE === "DEV"
    ? new aws.DynamoDB.DocumentClient({
        apiVersion: "2012-08-10",
        endpoint: process.env.DATABASE_ENDPOINT,
        region: "aws-us-west-2"
      })
    : new aws.DynamoDB.DocumentClient({
        apiVersion: "2012-08-10",
        region: "us-east-1",
        endpoint: process.env.DATABASE_ENDPOINT
      });

module.exports = sendToSentry(url)(async (req, res) => {
  try {
    var allowedOrigins = [
      "https://bartender-penny-37517.netlify.com",
      "https://scientist-frog-67481.netlify.com"
    ];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    var params = {
      TableName: dbName,
      Item: {
        CustomerId: "123",
        OtherThing: "Hey123"
      }
    };
    const putStuff = await dynamoClient.put(params).promise();
    var params = {
      TableName: dbName,
      Key: {
        CustomerId: "123"
      }
    };
    const getStuff = await dynamoClient.get(params).promise();
    return getStuff;
  } catch (e) {
    console.log(e);
  }
});
