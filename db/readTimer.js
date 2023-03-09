async function readTimer(client, timerName) {
  try {
    const { name, date } = await client.db("globotimer").collection("timers")
      .findOne({ name: timerName });
    return { name, date };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { readTimer };
