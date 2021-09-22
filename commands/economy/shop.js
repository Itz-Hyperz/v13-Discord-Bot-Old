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

let faxesCannotBeFucked = [];
const { MessageEmbed } = require('discord.js')
const ms = require('ms')
exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});
    if(!client.config.economy_module.shopCommand) return message.channel.send({ content: "This module is disabled." }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

    await con.query(`SELECT * FROM shop`, async (err, rows) => {
        if(err) throw err;
        if(rows[0]) {
            await rows.forEach(r => {
                faxesCannotBeFucked.push(`\`${r.productId}\` - **${r.productName}** - \`${client.config.econCurrency}${r.productPrice}\``) // Because FAXES Cannot Be Fucked
            });
            setTimeout(() => {
                const starter = new MessageEmbed()
                .setColor(`${client.config.colorhex}`)
                .setTitle(`Store Items:`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }) || client.user.avatarURL({ dynamic: true }))
                .setDescription(`__**ID** - **Item Name** - **Price**__\n${faxesCannotBeFucked.join("\n")}`)
                .setTimestamp()
                .setFooter(client.config.copyright)
                message.channel.send({ embeds: [starter] }).then(() => {
                    faxesCannotBeFucked = [];
                }).catch(e => {});
            }, 1000);
        } else {
            message.channel.send({ content: "There are no items currently in the store." }).catch(e => {});
        }
    });
            
}

exports.info = {
    name: 'shop',
    description: 'Econonmy System Component.',
    aliases: ['store', 'cart', 'viewstore', 'viewshop', 'items']
}