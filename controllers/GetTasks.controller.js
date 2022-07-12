const dynamoClient = require('../db/DynamoDBClient');
const client = require('../db/DynamoDBClient')

const TABLE = "tasks"

const getTasks = async () => {
   const params = {
      TableName: TABLE
   };
   const tasks = await dynamoClient.scan(params).promise();
   console.log(tasks);
   return tasks;
}

const controller = (request, response) => {
   response.send(getTasks());
}

module.exports = controller