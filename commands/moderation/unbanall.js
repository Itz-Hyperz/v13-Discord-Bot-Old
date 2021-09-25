/*
  _   _                  ____        _     ____                          _                    _ 
 | | | |_   _ _ __   ___| __ )  ___ | |_  |  _ \ ___ _ __ ___   __ _ ___| |_ ___ _ __ ___  __| |
 | |_| | | | | '_ \ / _ \  _ \ / _ \| __| | |_) / _ \ '_ ` _ \ / _` / __| __/ _ \ '__/ _ \/ _` |
 |  _  | |_| | |_) |  __/ |_) | (_) | |_  |  _ <  __/ | | | | | (_| \__ \ ||  __/ | |  __/ (_| |
 |_| |_|\__, | .__/ \___|____/ \___/ \__| |_| \_\___|_| |_| |_|\__,_|___/\__\___|_|  \___|\__,_|
        |___/|_|                                                                                
            
We have tried our very hardest to make this the #1 Discord bot around to date! With tons of new
features that not even some of the current bots around have! As-well with the new updated frame-
work on DiscordJS V13! We have hopefull mastered this new land, and we plan to keep it that way!
*/

const { MessageEmbed } = require('discord.js')
const ms = require('ms')

exports.run = async (client, message, args, con) => {

        try {
            if(message.author.id == message.guild.ownerId) {
                const someembedlol = new MessageEmbed()
                .setColor(client.config.colorhex)
                .setTitle(`Remove Bans`)
                .setDescription(`Please confirm that you wish to revoke all current server bans in this guild.\n\n**Note:** This process may take awhile, and cannot be easily stopped or un-done.\n\n**Do you still wish to continue?**\n✅ - Yes, remove all bans.\n❌ - No, cancel command.`)
                .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                .setTimestamp()
                .setFooter(`${client.config.copyright}`)

                message.channel.send({ embeds: [someembedlol] }).then(balls => {
                    balls.react('✅').then(() => balls.react('❌'));
                    const johncena = (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user.bot == false && user.id === message.author.id;
                    };
                    balls.awaitReactions({ johncena, max: 1, time: ms("25m")}).then(collected => {
                        const react23847= collected.first();
                        if(react23847.emoji.name === '✅') {
                            message.channel.send({ content: `Please Wait! We are beginning the process now...` }).catch(e => {})
                            setTimeout(() => {
                                
                                message.guild.bans.fetch().then(bans => {
                                    if (bans.size == 0) {message.channel.send({ content: "There are no banned users." }); throw "No members to unban."};
                                    bans.forEach(ban => {
                                        message.guild.members.unban(ban.user.id);                     
                                    })
                                }).then(() => console.log("Users are being unbanned.")).catch(e => console.log(e))

                            }, 6000);
                        }
                        if(react23847.emoji.name === '❌') {
                            return message.channel.send(`Cancelling update bans process...`).catch(e => {})
                        }
                    })
                }).catch(e => {if(client.config.debugmode) return console.log(e);});
            } else {
                message.channel.send({ content: `Only the guild owner may use this command...` }).catch(e => {});
            }
        } catch (e) {
            console.log(e)
        }

}

exports.info = {
    name: 'unbanall',
    description: 'Unban all users in the current server.',
    aliases: ['massunban', 'allunban']
}
