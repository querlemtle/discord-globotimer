const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Replies corresponding local time")
    .addStringOption(option =>
      option.setName("date")
        .setDescription("The input date that needs to be converted")),
  async execute(interaction) {
    const inputDate = interaction.options.getString("date");
    const parsedDate = Date.parse(inputDate);
    if (Number.isNaN(parsedDate)) {
      await interaction.reply("Invalid date. Please check your input and try again.");
    } else {
      await interaction.reply(`Corresponding local time is: <t:${Math.floor(parsedDate / 1000)}>`);
    }
  },
};