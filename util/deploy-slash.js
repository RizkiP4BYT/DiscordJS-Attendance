require("dotenv").config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, '../commands');
fs.readdirSync(commandsPath).forEach(dir => {
	const commandFiles = fs.readdirSync(`${commandsPath}/${dir}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(`${commandsPath}/${dir}`, file);
		const command = require(filePath);
		commands.push(command.data_slash.toJSON());
	}
})

const rest = new REST().setToken(process.env.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(process.env.clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();