// Read the commands directory and identify command files
const fs = require("node:fs");
const path = require("node:path");
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { MongoClient } = require("mongodb");
const { token, mongodbUri } = require("./config.json");
const { connectDb } = require("./db/connect");
const { reminder } = require("./remind");

// Create a new MongoClient
const mongoClient = new MongoClient(mongodbUri);

// Create a new discord client instance
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
// const message = new Message();

// Access commands in other files
discordClient.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    discordClient.commands.set(command.data.name, command);
  } else {
    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// When the client is ready, run this code (only once)
// Use 'c' for the event parameter to keep it separate from the already defined 'client'
discordClient.once(Events.ClientReady, c => {
  console.log(`${c.user.tag} is logged in and ready!`);
  discordClient.user.setPresence({ activities: [{ name: "counting time" }] });
});

discordClient.on("interactionCreate", async (interaction) => {
  // Exits if it's not a slash command
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command! Please try again.", ephemeral: true });
  }
});

// Login to Discord with your client's token
discordClient.login(token);

// Connect to the mongoDB server
connectDb(mongoClient).catch(console.error);

// Send time up reminder
reminder(discordClient, mongoClient, "628241374231134225", 30000);