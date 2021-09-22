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

module.exports = async(client, con, reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch();

    if(user.bot) {

    } else {

        if(!reaction.message.guild) return;

        if(client.config.reactionroles.enabled) {
            client.config.reactionroles.reactions.forEach(async r => {
            if(reaction.message.id == r.messageid && reaction.emoji.name == r.reactionname) {
            let somerole = await reaction.message.channel.guild.roles.cache.get(r.roleid);
            if(!somerole) return console.log(`A Reaction Roles Role ID is incorrect...`);
            if(r.workflow == 1) {
                let deUser = await reaction.message.guild.members.cache.get(user.id)
                deUser.roles.add(somerole).catch(e => {console.log(e)});
            } else if(r.workflow == 2) {
                let deUser = await reaction.message.guild.members.cache.get(user.id)
                deUser.roles.remove(somerole).catch(e => {console.log(e)});
            } else if (r.workflow == 3) {
                let deUser = await reaction.message.guild.members.cache.get(user.id)
                if(!deUser.roles.cache.has(somerole.id)) {
                    deUser.roles.add(somerole).catch(console.error);
                } else {
                    deUser.roles.remove(somerole).catch(console.error);
                }
            } else {
                console.log(`Invalid Workflow Entry VIA Reaction Roles...`);
            }
            reaction.users.remove(user);
            }
        });
        }

    }

}