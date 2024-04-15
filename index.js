require("dotenv").config()
const Discord = require("discord.js")
const fs = require("node:fs")
const path = require("node:path")
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildModeration,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent,
  ],
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.Reaction,
  ],
})

client.commands = new Discord.Collection()

// const commandsPath = path.join(__dirname, "commands")
// fs.readdirSync(commandsPath).forEach((dir) => {
//   const commandFiles = fs
//     .readdirSync(`${commandsPath}/${dir}`)
//     .filter((file) => file.endsWith(".js"))

//   for (const file of commandFiles) {
//     const filePath = path.join(`${commandsPath}/${dir}`, file)
//     const command = require(filePath)
//     client.commands.set(command.data_slash?.name, command)
//   }
// })

client.on("ready", () => {
  console.log(`Hello, there! ${client.user.username} is ready for you :)`)

  client.user.setActivity({
    name: `${client.user.username} | Smart Attendance Discord Bot`,
    type: 0,
  })
})

client.login(process.env.DISCORD_TOKEN)
