const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("convert")
    .setDescription("Convert date from one timezone to the other")
    .addStringOption(option =>
      option.setName("date")
        .setDescription("The input date that needs to be converted")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("target")
        .setDescription("The target timezone to convert into")),
  async execute(interaction) {
    const inputDate = interaction.options.getString("date");
    const parsedDate = Date.parse(inputDate);
    const inputTargetTZ = interaction.options.getString("target");

    if (Number.isNaN(parsedDate)) {
      await interaction.reply("Invalid date. Please check your input and try again.");
    } else {
      const resultDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "medium", timeZone: inputTargetTZ }).format(parsedDate);
      await interaction.reply(`${inputDate} is **${resultDate}** in ${inputTargetTZ}.`);
    }
  },
};