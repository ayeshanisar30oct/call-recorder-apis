// exports.handler = async (event) => {
//   console.log("Event: ", JSON.stringify(event, null, 2));
//   const httpMethod = event.httpMethod;
//   const path = event.path;
//   if (path == "/api/test-data") {
//     const responseMessage = 'Hello from Syed!';
//     return {
//       statusCode: 200,
//       headers: {
//         "Content-Type": "text/plain"
//       },
//       body: JSON.stringify({ message: responseMessage })
//     };
//   }

// };
const { handler: appHandler } = require('./app');

exports.handler = async (event, context) => {
  console.log("Event: ", JSON.stringify(event, null, 2));
  return appHandler(event, context);
};