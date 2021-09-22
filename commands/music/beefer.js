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

// Do not touch this command, it is the most valuable one

const voice = require('@discordjs/voice');
exports.run = async (client, message, args, con) => {

    if(!client.config.deleteCommands) {
        message.delete().catch(e => {});
    }

    let channel = message.member.voice.channel;
    if(!channel) return;

    const connection = voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    try {
        connection.on(voice.VoiceConnectionStatus.Ready, () => {
            const player = voice.createAudioPlayer();
            let resource = voice.createAudioResource('./src/utils/audio.mp3');
            player.play(resource);
            connection.subscribe(player);
            player.on(voice.AudioPlayerStatus.Idle, () => {
                let newresource = voice.createAudioResource('./src/utils/audio.mp3');
                player.play(newresource);
            });
        });
    } catch(e) {
        connection.destroy()
    }

}

exports.info = {
    name: "beefer",
    description: "IM SICK OF IT!",
    aliases: ['isoi']
}