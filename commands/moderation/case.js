const { MessageEmbed } = require('discord.js')

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

exports.run = async (client, message, args, con) => {

    try {

        if(!args[0]) return message.channel.send({ content: `Please include a case ID to check...` }).catch(e => {});

        await con.query(`SELECT * FROM cases WHERE uniqueid="${args[0]}"`, async (err, row) => {
            if(err) return console.log(err);
            if(!row[0]) {
                message.channel.send({ content: `I was unable to find that case. It may have been deleted.` }).catch(e => {});
            } else {
                var t;
                t = await client.users.fetch(row[0].enforcerid);
                var v;
                v = await client.users.fetch(row[0].userid);
                        const thecase = new MessageEmbed()
                        .setColor(client.config.colorhex)
                        .setTitle(`Case Information:`)
                        .setDescription(`**Number:** ${row[0].uniqueid}\n**Enforcer:** ${t.tag} - (${row[0].enforcerid})\n**User:** ${v.tag} - (${row[0].userid})\n**Type:** ${row[0].type}\n**Reason:** ${row[0].reason}`)
                        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)
                        message.channel.send({ embeds: [thecase] }).catch(e => {});
            }

        });

    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }
}

exports.info = {
    name: 'case',
    description: 'Check a warning case.',
    aliases: ['warns', 'cases', 'kicks', 'bans', 'mutes', 'punishment', 'casesearch', 'search']
}