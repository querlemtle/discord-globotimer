const { SlashCommandBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
const { mongodbUri } = require("../config.json");
const { createTimer } = require("../db/createTimer");

const client = new MongoClient(mongodbUri);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addtimer")
    .setDescription("Adds a new event timer")
    .addStringOption(option =>
      option.setName("eventname")
        .setDescription("The name of the event")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("date")
        .setDescription("The date of the event")
        .setRequired(true)),
  async execute(interaction) {
    const inputEventName = interaction.options.getString("eventname");
    const inputDate = interaction.options.getString("date");
    const parsedDate = Date.parse(inputDate);

    if (Number.isNaN(parsedDate)) {
      await interaction.reply("Invalid date. Please check your input and try again.");
    } else {
      const dateObj = new Date(inputDate);
      try {
        await createTimer(client, {
          "name": `${inputEventName}`,
          "date": `${dateObj.toISOString()}`
        });
        await interaction.reply(`**${inputEventName}** timer has been added!\r\nDate:  <t:${ Math.floor(parsedDate / 1000) }>`);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
