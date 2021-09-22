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

    let array = ["A", "B", "C", "D", "E", "F", "G"];
    let random = client.utils.maths(array)

    if(!message.mentions.users.first()) return message.channel.send({ content: "Please mention a user to attack..." }).catch(e => {});
    let user = message.mentions.users.first().username

    message.channel.send({ content: `Sending attack to ${user}` }).catch(e => {});

    if(random === "A") {
        setTimeout(() => {
            message.channel.send({ content: `\`\`\`fix\nDDOS Attack Successfull ;)\n\`\`\`` }).catch(e => {});
        }, 5000)
    } else {
        setTimeout(() => {
            message.channel.send({ content: `User getting lag?` }).catch(e => {});
        }, 5000)
    
        setTimeout(() => {
            message.channel.send({ content: `No?` }).catch(e => {});
        }, 10000)
    
        setTimeout(() => {
            message.channel.send({ content: `I can't ddos people :(` }).catch(e => {});
        }, 15000)
    }
    

}

exports.info = {
    name: "ddos",
    description: "See if im alive!",
    aliases: ['attack']
}