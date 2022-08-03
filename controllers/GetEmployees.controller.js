const dynamoClient = require('../db/DynamoDBClient');
const client = require('../db/DynamoDBClient')

const TABLE = "employees"

const getEmployees = async () => {
   const params = {
      TableName: TABLE
   };
   const employees = await dynamoClient.scan(params).promise();
   console.log(employees);
   return employees;
}

const controller = async (request, response) => {
   const employees = await getEmployees();

   return response.json({employees: employees});
}

module.exports = controller