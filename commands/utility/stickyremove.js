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

        let check = await client.utils.permCheck(client, message, 'stickymsgs')
        if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

        if(!client.config.utility_module.stickyMessages) return message.channel.send({ content: "This module is currently disabled." }).catch(e => {});

        await con.query(`SELECT * FROM stickymsgs WHERE channel='${message.channel.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                await con.query(`DELETE FROM stickymsgs WHERE channel='${message.channel.id}'`, async(err, row) => {
                    if(err) throw err;
                });
                message.channel.send({ content: `**Sticky Message Deleted!**` }).catch(e => {});
            } else {
                message.channel.send({ content: `**There is no sticky message in this channel.**` }).catch(e => {});
            }
        });
    
}

exports.info = {
    name: "stickyremove",
    description: "Delete a sticky message.",
    aliases: ['deletesticky', 'delsticky', 'removesticky', 'remsticky']
}