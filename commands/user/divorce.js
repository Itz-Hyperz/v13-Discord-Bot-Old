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

const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, con) => {
  if (message.guild.id !== client.config.your_guild_id)
    return message.channel
      .send({ content: "This command can only be ran in the main guild." })
      .then((msg) => {
        if (client.config.deleteCommands) {
          setTimeout(() => {
            msg.delete().catch((e) => {});
          }, 14000);
        }
      })
      .catch((e) => {});
  if (!client.config.utility_module.marriageSystem)
    return message.channel
      .send({ content: "This module is currently disabled." })
      .then((msg) => {
        if (client.config.deleteCommands) {
          setTimeout(() => {
            msg.delete().catch((e) => {});
          }, 14000);
        }
      })
      .catch((e) => {});

  await con.query(
    `SELECT * FROM marriage WHERE userid='${message.author.id}' OR spouse='${message.author.id}'`,
    async (err, row) => {
      if (err) throw err;
      if (row[0]) {
        await con.query(
          `DELETE FROM marriage WHERE userid='${message.author.id}' OR spouse='${message.author.id}' LIMIT 1`,
          async (err, row) => {
            if (err) throw err;
            message.channel
              .send({
                content: `You have successfully been divorced. Sorry it didn't work out...`,
              })
              .then((msg) => {
                if (client.config.deleteCommands) {
                  setTimeout(() => {
                    msg.delete().catch((e) => {});
                  }, 14000);
                }
              })
              .catch((e) => {});
          }
        );
      } else {
        return message.channel
          .send({ content: `You are not currently married.` })
          .then((msg) => {
            if (client.config.deleteCommands) {
              setTimeout(() => {
                msg.delete().catch((e) => {});
              }, 14000);
            }
          })
          .catch((e) => {});
      }
    }
  );
};

exports.info = {
  name: "divorce",
  description: "Marriage System Component.",
  aliases: ["breakup"],
};
