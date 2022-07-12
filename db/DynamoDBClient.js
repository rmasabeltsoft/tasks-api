const AWS = require('aws-sdk');
//const DataMapper = require('@aws/dynamodb-data-mapper').DataMapper;
require('dotenv').config();

/*let config = {}

if (process.env.NODE_ENV === 'development') {
   config.region = 'us-center-1'
   config.endpoint = 'http://localhost:8000'
   config.accessKey = 'FOOBAR'
   config.secretAccessKey = 'FOOBAR'
} else {
   config.region = 'us-east-1'
   config.accessKey = ''
   config.secretAccessKey = ''
}*/

AWS.config.update({
   region: process.env.AWS_DEFAULT_REGION,
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoClient;