require("dotenv").config();
const NotifmeSdk = require("notifme-sdk").default;
const aws = require("aws-sdk");
const { json } = require("micro");
const sendToSentry = require("micro-sentry");
const url =
  "https://a15b2d040d4a4d24b7f78953b837f273:b318a6ecf8c1479d9d590250e89d534e@sentry.io/211784";

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

const dynamodb = new aws.DynamoDB({
  // region: "aws-us-east-1",
  region: "aws-us-west-2",
  endpoint: process.env.DATABASE_ENDPOINT
});

try {
  dynamodb.deleteTable(
    { TableName: `VerifyPhoneNumber-${process.env.STAGE}` },
    function(err, data) {
      if (err) {
        console.error(
          "Unable to delete table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log(
          "Deleted table. Table description JSON:",
          JSON.stringify(data, null, 2)
        );
      }
    }
  );

  var params = {
    AttributeDefinitions: [
      // {
      //   AttributeName: "VerificationNumber",
      //   AttributeType: "S"
      // },
      {
        AttributeName: "PhoneNumber",
        AttributeType: "S"
      }
    ],
    KeySchema: [
      {
        AttributeName: "PhoneNumber",
        KeyType: "HASH"
      }
      // {
      //   AttributeName: "VerificationNumber",
      //   KeyType: "Range"
      // }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: `VerifyPhoneNumber-${process.env.STAGE}`
  };
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else console.log(data); // successful response
  });
} catch (e) {
  console.log(e);
}

const notifmeSdk = new NotifmeSdk({
  channels: {
    sms: {
      providers: [
        {
          type: "twilio",
          accountSid: process.env.TWILIO_ACCOUNT_SID,
          authToken: process.env.TWILIO_AUTH_TOKEN
        }
      ]
    }
  }
});

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
    return "This was a GET request... verifyPhone doh";
  }
  const props = await json(req);

  // Minimal routing (two routes)
  if (req.url.includes("start")) {
    // Generate 5 digit verification number
    const verifyNumber = Math.floor(Math.random() * 90000) + 10000;

    var params = {
      Item: {
        PhoneNumber: {
          S: props.phone
        },
        VerificationNumber: {
          S: `${verifyNumber}`
        }
      },
      TableName: `VerifyPhoneNumber-${process.env.STAGE}`
    };

    const putStuff = await dynamodb.putItem(params).promise();
    const sendMessage =
      putStuff &&
      (await notifmeSdk.send({
        sms: {
          from: "+12064721738",
          to: props.phone,
          text: `Your verification number is: ${verifyNumber}`
        }
      }));

    return sendMessage && sendMessage.status;
  }

  if (req.url.includes("verify")) {
    var params = {
      Key: {
        PhoneNumber: {
          S: props.phone
        }
      },
      TableName: `VerifyPhoneNumber-${process.env.STAGE}`
    };

    const objFromDb = await dynamodb.getItem(params).promise();
    console.log(objFromDb);
    const numberFromDb = objFromDb.Item.VerificationNumber.S;
    return String(numberFromDb === String(props.verifyNumber));
  }

  // If no routes match
  return "This route has nothing, 404";
});
