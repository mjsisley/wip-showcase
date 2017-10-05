const aws = require("aws-sdk");

const dbName = `ExampleApp-${process.env.STAGE}`;

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "us-east-1"
});

const dynamoClient = new aws.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  endpoint: process.env.DATABASE_ENDPOINT,
  region: "us-east-1"
});

exports.handler = async (event, context, callback) => {
  try {
    await dynamoClient
      .put({
        TableName: dbName,
        Item: {
          Id: "123",
          OtherThing: "Other"
        }
      })
      .promise();

    const getStuff = await dynamoClient
      .get({
        TableName: dbName,
        Key: {
          CustomerId: "123"
        }
      })
      .promise();
    callback(
      null,
      `${JSON.stringify(
        getStuff
      )} Lambda running... this is triggered by CloudWatch on AWS, also exposed through API Gateway`
    );
  } catch (e) {
    callback(null, `${e} ${dbName}`);
  }
};
