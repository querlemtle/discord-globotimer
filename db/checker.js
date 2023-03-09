async function checkTimers(client) {
  console.log(`${new Date().toLocaleString()} -- Start checking timers...`);

  try {
    // Get current time till minutes
    const yearNow = new Date().getFullYear();
    const monthNow = new Date().getMonth();
    const dateNow = new Date().getDate();
    const hoursNow = new Date().getHours();
    const minutesNow = new Date().getMinutes();
    // Get all timers from db
    const collArr = await client.db("globotimer").collection("timers").find().toArray();
    let result = null;
    // Check if any existed timer matches to current time
    collArr.map(doc => {
      const date = new Date(doc.date);
      const isYearEqual = date.getFullYear() === yearNow;
      const isMonthEqual = date.getMonth() === monthNow;
      const isDateEqual = date.getDate() === dateNow;
      const isHoursEqual = date.getHours() === hoursNow;
      const isMinutesEqual = date.getMinutes() === minutesNow;
      if (isYearEqual && isMonthEqual && isDateEqual && isHoursEqual && isMinutesEqual) {
        result = doc.name;
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { checkTimers };