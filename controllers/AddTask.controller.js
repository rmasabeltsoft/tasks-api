const dynamoClient = require('../db/DynamoDBClient');
const client = require('../db/DynamoDBClient');

const TABLE = "tasks";
var sampleTask = null;

const addTask = async (task) => {
   const params = {
      TableName: TABLE,
      Item: task
   };
   console.log("Adding or updating task: " + task);
   return await dynamoClient.put(params).promise();
}

const controller = (request, response) => {
   response.send(addTask(request.body));
}

module.exports = controller