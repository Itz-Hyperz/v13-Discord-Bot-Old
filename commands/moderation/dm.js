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

    let check = await client.utils.permCheck(client, message, 'moderation')
    if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

    if(!args[0]) return message.channel.send({ content: "Please include someone to message." }).catch(e => {});
    if(!args[1]) return message.channel.send({ content: "Please include something to send in the message." }).catch(e => {});

    let target;
    if(message.mentions.users.first()) {
        target = await client.utils.userFetch(client, message.mentions.users.first().id)
    } else if(!isNaN(args[0])) {
        target = await client.utils.userFetch(client, args[0])
    } else {
        return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
    }

    await target.send({ content: `${args.slice(1).join(" ")}` }).then(() => {
        message.channel.send({ content: "Message send successfully!" })
    }).catch(e => {
        message.channel.send({ content: "This user has DMs locked." })
    });

}

exports.info = {
    name: "dm",
    description: "Send a message to a user.",
    aliases: ['pm', 'message']
}