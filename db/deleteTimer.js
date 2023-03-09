async function deleteTimer(client, timerName) {
  try {
    await client.db("globotimer").collection("timers").deleteOne({ name: timerName });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { deleteTimer };