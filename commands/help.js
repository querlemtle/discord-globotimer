const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all available commands and options"),
  async execute(interaction) {
    const manual =
    `
    **/timestamp [date] [message] [index]**
    Replies timestamp in corresponding local time or insert the timestamp into given message.
    - Example: \`\`\`/timestamp date: 2023-02-20 21:00 est message: Movie night will be held at ! index: 6\`\`\`
    
    **/convert [date] [tzname]**
    Convert date from one timezone to the other. The target timezone needs to follow tz database names: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    - Example: \`\`\`/convert date: 2023-02-20 09:00 est tzname: Europe/Oslo\`\`\`

    **/addtimer [eventname] [timer]**
    Create a new event reminder.
    - Example: \`\`\`/addtimer eventname: Boss raid timer: 2020-07-15 20:00 gmt\`\`\`
    
    **/deltimer [eventname]**
    Delete the reminder by name.
    - Example: \`\`\`/deltimer eventname: birthday party\`\`\`

    **/updatetimer [oldname] [newname]**
    Update the event name.
    - Example: \`\`\`/updatetimer oldname: movie night newname: game night\`\`\`

    **/findtimer [eventname]**
    Find the specific reminder by event name.
    - Example: \`\`\`/findtimer eventname: Boss raid\`\`\``;

    await interaction.reply(manual);
  },
};
