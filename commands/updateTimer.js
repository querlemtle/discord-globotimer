const { SlashCommandBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
const { mongodbUri } = require("../config.json");
const { updateTimer } = require("../db/updateTimer");

const client = new MongoClient(mongodbUri);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updatetimer")
    .setDescription("Update the event timer name")
    .addStringOption(option =>
      option.setName("oldname")
        .setDescription("The current event timer name")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("newname")
        .setDescription("The updated event timer name")
        .setRequired(true)),
  async execute(interaction) {
    try {
      const inputOldEventName = interaction.options.getString("oldname");
      const inputNewEventName = interaction.options.getString("newname");
      await updateTimer(client, inputOldEventName, { name: inputNewEventName });
      await interaction.reply(`**${inputNewEventName}** timer has been updated!`);
    } catch (error) {
      console.log(error);
    }
  },
};

