import { REST, Routes } from 'discord.js';


// const commands = [
//   {
//     name: 'ping',
//     description: 'Replies with Pong!',
//   },
// ];

const commands = [
  {
    name: 'create',
    description: 'Create a new short URL',
  },
];


const rest = new REST({ version: '10' }).setToken("MTM5OTUzNDE0ODM2ODA3NjgyMA.G1H4fG.QOF2AcR3izivrxEHxKERHfwcCPWnOJS0D3Fqt8");


try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1399534148368076820"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}