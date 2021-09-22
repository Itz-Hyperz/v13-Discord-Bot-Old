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

    if(message.guild.id !== client.config.your_guild_id) return message.channel.send({ content: "This command can only be ran in the main guild." }).catch(e => {});
    if(!client.config.tickets_module.enabled) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

            try {

                const guild = client.guilds.cache.get(client.config.your_guild_id)

                var max = client.config.tickets_module.maxtickets
                var bruh = 0
                    
                await guild.channels.cache.forEach(c => {
                    if(c.name === `ticket-${message.author.username.toLowerCase()}`) {
                    bruh = bruh + 1
                    }
                });

                if(bruh >= max) return message.channel.send(`You may only have **${max} ticket(s)** open at a time.`).then(msg => {
                    bruh = 0
                }).catch(e => {});

                bruh = 0

            } catch(e) {
                console.log(e)
            }
        
            let everyoneRole = message.guild.roles.cache.find(role => role.name === "@everyone");
            let permissionOverwriteArray = [{
                    id: message.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: everyoneRole.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: client.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
            ]
            client.config.permissions_module.support.forEach(role => {
                let yeet = message.guild.roles.cache.get(role);
                if (!yeet) {
                    console.log(`Role ID: ${role} is not in the server`)
                } else {
                    let tempArray = {
                        id: role,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }
                    permissionOverwriteArray.push(tempArray);
                }
            });
            let hello = await message.guild.channels.create(`ticket-${message.author.username}`, {
                type: 'text'
            }).catch(e => {
                 
                if (e) console.log(`I was not able to make a channel in  ${message.guild.id} || ${message.guild.name}`);
            }).then(chan => {
                if(client.config.tickets_module.useCategories = true){
                    chan.setParent(client.config.tickets_module.categoryId, {lockPermissions: false})
                }
                chan.permissionOverwrites.set(permissionOverwriteArray)
                chan.setTopic(`Ticket for ${message.author.username}`)
                client.utils.ticket(client, con, chan)
                message.channel.send({ content: `Your new ticket has been opened in <#${chan.id}>` }).catch(e => {})
            });
            if (hello == undefined) return;
}

exports.info = {
    name: 'ticketopen',
    description: 'A command.',
    aliases: ['new', 'newticket', 'ticket']
}