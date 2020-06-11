// Stuff
const Emitter = require('events');

const emitter = new Emitter();

// Discord
const Discord = require('discord.js');

const client = new Discord.Client();

let channel;
let roles;

client.once('ready', () => {

	console.log('discord bot started');

	channel = client.guilds.cache.get(process.env.GUILDID).channels.cache.get(process.env.CHANNELID);
	roles = channel.guild.roles.cache;
	console.log('discord bot has been configured');
});

client.once('disconnect', () => {
	console.log('discord bot has been disconnected!');
});

emitter.on('newDiscordMsg', (msgToRole, msg) => {

	if(!msg || !msgToRole) {
		return channel.send('Вы не указали роль, или сообщение!');
	}

	const roleID = channel.guild.roles.cache.find(role => role.name == msgToRole);

	const embed = new Discord.MessageEmbed()
			   .setAuthor('Message Control Panel')
			   .setDescription(msg)
			   .setColor('#7908AA')
			   .setTitle(`Обращение к участникам Discord канала`);


	channel.send('<@&' + roleID + '>', embed);

});

function getRoles() {
	return roles;
};

client.login(process.env.TOKEN);

module.exports.getRoles = getRoles;
module.exports.emitter = emitter;
