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

const figlet = require('figlet')
exports.run = async (client, message, args, con) => {

    if(!args[0]) return message.channel.send({ content: "Please include something to figlify." }).catch(e => {});

    let joined = args.join(" ")
    figlet.text(joined, { width: `900`}, async function(err, head) {
        if(err) throw err;
        message.channel.send({ content: `\`\`\`\n${head}\n\`\`\`` }).then((msg) => {
            if(client.config.deleteCommands) {
                setTimeout(() => {
                    msg.delete().catch(e => {});
                }, 14000);
            }
        }).catch(e => {});
    });

}

exports.info = {
    name: "ascii",
    description: "Create ascii text.",
    aliases: ['textimage', 'imagetext', 'figlet', 'figlify']
}