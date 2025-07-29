import { Client, Events, GatewayIntentBits, Message } from 'discord.js';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,], });


client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    
    if(message.content.startsWith("create")) {
        const url = message.content.split("create")[1];
        return message.reply({
            content : "Generating Short ID for " + url,
        });
    }
    message.reply({
        content : "Hello I am from Bot How can I help you",
    })
    // console.log(message.content);
    //console.log(message);
});


client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // interaction.reply("Pong !!");

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});



client.login("MTM5OTUzNDE0ODM2ODA3NjgyMA.G1H4fG.QOF2AcR3izivrxEHxKERHfwcCPWnOJS0D3Fqt8");