// Stuff
const config = require('./config.json');
const Emitter = require('events');

const emitter = new Emitter();

// Discord
const Discord = require('discord.js');

const client = new Discord.Client();

let channel;
let roles;

client.once('ready', () => {

	console.log('discord bot started');

	channel = client.guilds.cache.get(config.guildID).channels.cache.get(config.channelID);
	roles = channel.guild.roles.cache;
	console.log('discord bot has been configured');
});

client.once('disconnect', () => {
	console.log('discord bot has been disconnected!');
});

emitter.on('newDiscordMsg', (role, msg) => {

	if(!msg || !role) {
		return channel.send('Вы не указали роль, или сообщение!');
	}

	const embed = new Discord.MessageEmbed()
			   .setAuthor('Message Control Panel')
			   .setDescription(msg)
			   .setColor('#7908AA')
			   .setTitle(`Обращение к участникам Discord канала`);


	channel.send(role, embed);

});

function getRoles() {
	return roles;
};

client.login(config.token);

module.exports.getRoles = getRoles;
module.exports.emitter = emitter;
