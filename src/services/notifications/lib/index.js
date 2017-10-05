require("dotenv").config();
const NotifmeSdk = require("notifme-sdk").default;
const { json } = require("micro");
const sendToSentry = require("micro-sentry");
const url =
  "https://a15b2d040d4a4d24b7f78953b837f273:b318a6ecf8c1479d9d590250e89d534e@sentry.io/211784";

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
    },
    email: {
      providers: [
        {
          type: "sendgrid",
          apiKey: process.env.SENDGRID_AUTH_KEY
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
    return "This was a GET request... notifications doh";
  }

  const params = await json(req);

  if (params.phone && params.email && params.name) {
    notifmeSdk
      .send({
        sms: {
          from: "+12064721738",
          to: params.phone,
          text: `Hello ${params.name}, this is a text from notifme.`
        },
        email: {
          from: "mjsisley@gmail.com",
          to: params.email,
          subject: `Hi ${params.name}`,
          html: `Hello ${params.name}, this is a text from notifme.`
        }
      })
      .then(console.log);
    return "Notifications Ready!";
  } else {
    return "Not Correct Input";
  }
});
