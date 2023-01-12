const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timestamp")
    .setDescription("Replies timestamp in corresponding local time or insert the timestamp into given message")
    .addStringOption(option =>
      option.setName("date")
        .setDescription("The date to parse")
        .setRequired(true))
        .addStringOption(option =>
          option.setName("message")
            .setDescription("The message to insert timestamp and reply with"))
    .addIntegerOption(option =>
      option.setName("index")
        .setDescription("Where to insert the timestamp into custom message. The index starts from zero.")),
  async execute(interaction) {
    const inputDate = interaction.options.getString("date");
    const inputMessage = interaction.options.getString("message") || "Corresponding local time is:";
    const inputLocation = interaction.options.getInteger("index") || 4;
    const parsedDate = Date.parse(inputDate);

    if (Number.isNaN(parsedDate)) {
      await interaction.reply("Invalid date. Please check your input and try again.");
    } else {
      const discordTS = `<t:${Math.floor(parsedDate / 1000)}>`;
      const tempMessageArr = inputMessage.split(" ");
      tempMessageArr.splice(inputLocation, 0, discordTS);
      const outputMessage = tempMessageArr.join(" ");
      await interaction.reply(outputMessage);
    }
  },
};