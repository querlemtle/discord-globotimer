const { SlashCommandBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
const { mongodbUri } = require("../config.json");
const { deleteTimer } = require("../db/deleteTimer");

const client = new MongoClient(mongodbUri);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deltimer")
    .setDescription("Delete the event timer by name")
    .addStringOption(option =>
      option.setName("eventname")
        .setDescription("The name of the event")
        .setRequired(true)),
  async execute(interaction) {
    try {
      const inputEventName = interaction.options.getString("eventname");
      await deleteTimer(client, inputEventName);
      await interaction.reply(`**${inputEventName}** timer has been deleted.`);
    } catch (error) {
      console.log(error);
    }
  }
};
