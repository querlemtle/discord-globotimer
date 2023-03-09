const { checkTimers } = require("./db/checker");

async function reminder(discordClient, mongoClient, id, ms) {
  setInterval(async () => {
    const result = await checkTimers(mongoClient);
    // Only send message if any timer is up
    if (!result) return;
    // Get the channel through cache
    const targetChannel = discordClient.channels.cache.get(id);
    if (!targetChannel) return;
    targetChannel.send(`⏰ @everyone **${result}** has started!`);
  }, ms);

}

module.exports = { reminder };