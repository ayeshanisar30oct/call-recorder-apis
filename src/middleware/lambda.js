exports.handler = async (event) => {
    console.log("Event: ", JSON.stringify(event, null, 2));
    
    // Example processing (could be replaced with your logic)
    const responseMessage = 'Hello from Lambda!';
    
    // Return a response object for APIs (if using AWS API Gateway)
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify({ message: responseMessage })
    };
  };
