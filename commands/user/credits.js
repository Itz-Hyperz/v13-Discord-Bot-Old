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

const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colorhex)
    .setDescription(`**Programming**\n[@Hyperz](https://hyperz.net) - *Physical Programming.*\n[@PlutoTheDev](https://plutothe.dev/) - *Ticket Transcripts B4 Rewrite.*\n[@FAXES](https://faxes.zone) - *Mental Support (FaxTherapy)*\n[@Beefer](https://github.com/BeeferDev) - *Mental Support.*\n\n**Helpful Sources**\n[GitHub](https://github.com/)\n[Stack Overflow](https://stackoverflow.com/)\n[DJS Docs](https://discord.js.org/)\n\n**Bug Testers**\n[@RagnaRok](https://godzcustoms.com/), [@SamTheMan](https://samtheman.shop/), [@Plzhelp69](https://www.youtube.com/channel/UC5P2Slz45-KqIwNLKYAWx5Q), [@Chr!s](https://github.com/GroddyCodes), [@Kuwu](https://kuwus-shack.tebex.io/category/1849092), [@Jordan2139](https://jordan2139.me/), [@MercGuyAnthony](https://brightant.xyz/s/discord), [@Killingit](https://www.twitch.tv/killingit102), [@Master Coomway](https://www.youtube.com/channel/UC5TcNg9rjOJz1YpkYinpuAA), [@JipyTheDev](https://github.com/joshua66553), [@Pax](https://paxgrapics.xyz/)`)
    message.channel.send({ embeds: [embed] }).then((msg) => {
        if(client.config.deleteCommands) {
            setTimeout(() => {
                msg.delete().catch(e => {});
            }, 14000);
        }
    }).catch(e => {});

}

exports.info = {
    name: "credits",
    description: "View the credits for this bot!",
    aliases: ['creator', 'hyperz']
}
