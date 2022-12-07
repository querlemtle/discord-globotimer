const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Replies corresponding local time"),
  async execute(interaction) {
    await interaction.reply(`Corresponding local time is: <t:${Math.floor(Date.now() / 1000)}>`);
  },
};