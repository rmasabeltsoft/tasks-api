const dynamoClient = require('../db/DynamoDBClient');
const client = require('../db/DynamoDBClient')

const TABLE = "categories"

const getCategories = async () => {
   const params = {
      TableName: TABLE
   };
   const categories = await dynamoClient.scan(params).promise();
   console.log(categories);
   return categories;
}

const controller = async (request, response) => {
   const categories = await getCategories();

   return response.json({categories: categories});
}

module.exports = controller