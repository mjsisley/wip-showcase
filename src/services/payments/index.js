require("dotenv").config();
const { send } = require("micro");
const cors = require("micro-cors")({
  origin:
    process.env.STAGE === "staging1"
      ? "https://scientist-frog-67481.netlify.com"
      : "https://bartender-penny-37517.netlify.com"
});
const stripe = require("stripe")(process.env.STRIPE_TEST_SK);
const sendToSentry = require("micro-sentry");
const url =
  "https://a15b2d040d4a4d24b7f78953b837f273:b318a6ecf8c1479d9d590250e89d534e@sentry.io/211784";

// TODO: Store info in AWS DynamoDB
// TODO: Check for existing customer before creating customer
// TODO: Check for existing card before creating card for customer
// TODO: Allow for the setup of recurring payments

const handler = async (req, res) => {
  // if (req.method === "GET") {
  //   send(res, 200, "This was a GET request... payments doh");
  //   return;
  //   // return "This was a GET request... payments doh";
  // }

  try {
    const customer = await stripe.customers.create({
      email: "mjsisley@gmail.com"
    });
    const card =
      customer &&
      (await stripe.customers.createSource(customer.id, {
        source: {
          object: "card",
          exp_month: 10,
          exp_year: 2018,
          number: "4242 4242 4242 4242",
          cvc: 100
        }
      }));
    const charge =
      card &&
      (await stripe.charges.create({
        amount: 1600,
        currency: "usd",
        customer: card.customer
      }));

    send(
      res,
      200,
      `The payment was attempted: ${charge ? "succeeded" : "failed"}`
    );
    return;
    // return `The payment was attempted: ${charge ? "succeeded" : "failed"}`;
  } catch (err) {
    console.log(err);
    send(res, 200, err);
    return;
  }
};

module.exports = sendToSentry(url)(cors(handler));
