async function connectDb(client) {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB cluster.");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connectDb };
