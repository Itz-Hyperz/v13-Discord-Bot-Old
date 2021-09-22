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

const ms = require("ms");
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, con) => {

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});
        
        var somereas;

        if(args[2]) {
            somereas = args.slice(2).join(" ")
        } else {
            somereas = "N/A"
        }

        let target;
        if(message.mentions.users.first()) {
            target = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
        } else if(!isNaN(args[0])) {
            target = await client.utils.memberFetch(client, message.guild, args[0])
        } else {
            return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
        }

        if (target) {
            let tid = target.user.id
            const deMuteRole = client.config.utility_module.mutedRoleId
                if(target.roles.cache.find(role => role.id === deMuteRole)) {

                    message.channel.send({ content: "That user is already muted..." }).catch(e => {})

                } else {

                    try {

                        if(!args[1]){
                            return message.channel.send({ content: "You didnt specify a time!" })
                        } else {

                        let time = args[1]

                        target.roles.add(deMuteRole);

                        await con.query(`SELECT * FROM users WHERE userid='${tid}'`, async (err, row) => {
                            await con.query(`UPDATE users SET mutes = mutes + 1 WHERE userid='${tid}'`, async (err, row) => {});
                            await con.query(`UPDATE users SET isMuted = 'true' WHERE userid='${tid}'`, async (err, row) => {});
                            await con.query(`UPDATE users SET muteTime = '${time}' WHERE userid='${tid}'`, async (err, row) => {});
                        });

                        await con.query(`SELECT COUNT(uniqueid) as total FROM cases`, async (err, row) => {
                            let uniqueid = row[0].total + 1
                            let refinedreason = somereas.replace("'", "").replace("`", "")
                            await con.query(`INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${tid}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Mute')`, async (err, row) => {
                                if(err) throw err;
                            });
                        });

                        if(client.config.logging_module.punishments) {

                            client.config.logging_module.punishmentsChannels.forEach(async chan => {
                        
                                const thechannel = client.channels.cache.get(chan)
                                if(!thechannel) {
                                    console.log("One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names.")
                                } else {
                                    const logembed = new MessageEmbed()
                                        .setColor(`${client.config.logging_module.punishmentsColorhex || client.config.colorhex}`)
                                        .setAuthor(`Action Logs - User Muted`, client.user.displayAvatarURL())
                                        .addFields(
                                            {name: `Enforcer:`, value: `${message.author.tag}`},
                                            {name: `User ID:`, value: `${tid}`},
                                            {name: `User Tag:`, value: `${target.user.tag}`},
                                            {name: `Reason:`, value: `${somereas}`},
                                            {name: `Time:`, value: `${time}`},
                                        )
                                        .setTimestamp()
                                        .setFooter(`${client.config.copyright}`)
                                    thechannel.send({ embeds: [logembed] }).catch(e => {})
                                }
                            
                            }); 
                    
                        }

                        const getBeamed = new MessageEmbed()
                        .setColor(`${client.config.colorhex}`)
                        .setTitle(`${target.user.username} was muted!`)
                        .setDescription(`They will be unmuted after the time is up!`)
                        .setTimestamp()
                        .setFooter(`${client.config.copyright}`)

                        message.channel.send({ embeds: [getBeamed] }).catch(e => {})

                        try {

                            const dmEmbed = new MessageEmbed()
                            .setColor(client.config.colorhex)
                            .setTitle(`⚠️ You've Been Muted! ⚠️`)
                            .addFields(
                                {name: `Muted By:`, value: `${message.author.tag}`},
                                {name: `Expiration:`, value: `${time}`},
                            )
                            .setTimestamp()
                            .setFooter(`${client.config.copyright}`)
                        
                            target.send({ embeds: [dmEmbed] }).then(msg => {
                                message.channel.send({ content: `I have successfully alerted the user privately.` }).catch(e => {});
                            });
        
                        } catch(e) {
                            if(client.config.debugmode) return console.log(e);
                        }

                        setTimeout(async function(){
                
                            target.roles.remove(deMuteRole);
                                const getunBeamed = new MessageEmbed()
                                .setColor(`${client.config.colorhex}`)
                                .setTitle(`${target.user.username} was un-muted!`)
                                .setDescription(`They are officially allowed to speak again!`)
                                .setTimestamp()
                                .setFooter(`${client.config.copyright}`)

                                message.channel.send({ embeds: [getunBeamed] }).catch(e => {})

                                try {

                                    const dmEmbed = new MessageEmbed()
                                    .setColor(client.config.colorhex)
                                    .setTitle(`⚠️ You've Been Un-Muted! ⚠️`)
                                    .setDescription(`We __encourage__ you to watch your behavior next time!`)
                                    .setTimestamp()
                                    .setFooter(`${client.config.copyright}`)
                                
                                    target.send({ embeds: [dmEmbed] })

                                    await con.query(`UPDATE users SET isMuted = 'false' WHERE userid='${tid}'`, async (err, row) => {});
                                    await con.query(`UPDATE users SET muteTime = '0' WHERE userid='${tid}'`, async (err, row) => {});
                
                                } catch(e) {
                                   if(client.config.debugmode) return console.log(e);
                                }

                        }, ms(time));
                    }

                    } catch(e) {
                       if(client.config.debugmode) return console.log(e);
                    }
            }

        } else {
            message.channel.send({ content: 'I couldnt find that user...' }).catch(e => {})
        }
}

exports.info = {
    name: 'mute',
    description: 'Mute a member.',
    aliases: ['silence', 'shush', 'shutup', 'shut']
}