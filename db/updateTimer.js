async function updateTimer(client, oldTimerName, newTimerName) {
  try {
    await client.db("globotimer").collection("timers")
      .updateOne({ name: oldTimerName }, { $set: newTimerName });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updateTimer };