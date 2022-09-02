// codigo ejemplo, un archivo .js por cada funcion (listas, tweets fetch...)
// sustituir TODO_BASE_URL por la variable que tenga la key

const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const { id } = event.queryStringParameters;
    const response = await axios.get(`${process.env.TODO_BASE_URL}/${id}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ title: response.data.title }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};