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
let array = [];

exports.run = async (client, message, args, con) => {

        if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
        if(!client.config.utility_module.useClientCommands) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

        await con.query(`SELECT * FROM clients ORDER BY uniqueid ASC`, async (err, rows) => {
            if(err) return console.log(err);
            if(rows[0]) {

                await rows.forEach(async r => {
                    let user = await client.users.fetch(r.userid)
                    array.push(`**${r.uniqueid}.** ${user.tag}`)
                });

                let final = array.join('\n')
                let embed = new MessageEmbed()
                .setColor(client.config.colorhex)
                .setTitle(`Current Clients`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(final)
                .setTimestamp()
                .setFooter(client.config.copyright)
                await message.channel.send({ embeds: [embed] }).then(() => {
                    array = [];
                }).catch(e => {})

            } else {
                return message.channel.send({ content: "There are no current clients." })
            }

        });

}

exports.info = {
    name: 'clients',
    description: 'Grab a list of the clients.',
    aliases: ['viewclients', 'allclients', 'listclients']
}