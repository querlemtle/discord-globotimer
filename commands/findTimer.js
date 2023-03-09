const { SlashCommandBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
const { mongodbUri } = require("../config.json");
const { readTimer } = require("../db/readTimer");

const client = new MongoClient(mongodbUri);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("findtimer")
    .setDescription("Find the corresponding timer by event name")
    .addStringOption(option =>
      option.setName("eventname")
        .setDescription("The name of the event")
        .setRequired(true)),
  async execute(interaction) {
    const inputEventName = interaction.options.getString("eventname");
      try {
        const { name, date } = await readTimer(client, inputEventName);
        const discordTS = `<t:${Math.floor(Date.parse(date) / 1000)}>`;
        if (!name) {
          await interaction.reply("Nothing is found with the given name.");
        }
        await interaction.reply(`**${name}**\r\n${discordTS}`);
      } catch (error) {
        console.log(error);
      }
  },
};
