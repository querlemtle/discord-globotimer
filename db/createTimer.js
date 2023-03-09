async function createTimer(client, newTimer) {
  try {
    await client.db("globotimer").collection("timers").insertOne(newTimer);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createTimer };
