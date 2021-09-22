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
  try {
    if (message.guild.id !== client.config.your_guild_id)
      return message.channel
        .send({ content: "This command can only be ran in the main guild." })
        .catch((e) => {});

    let check = await client.utils.permCheck(client, message, "moderation");
    if (!check)
      return message.channel
        .send({ content: "You don't have permission to use this command." })
        .catch((e) => {});

    const newargs = message.content.split(" ");
    let deleteCount = 1;
    try {
      deleteCount = parseInt(newargs[1], 10);
    } catch (err) {
      return message.channel.send({
        content: "Please provide the number of messages to delete. (max 100)",
      });
    }

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send({
        content:
          "Please provide a number between 2 and 100 for the number of messages to delete",
      });

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount,
    });
    message.channel
      .bulkDelete(fetched)
      .catch((error) =>
        message.channel.send({
          content: `Couldn't delete messages because of: ${error}`,
        })
      );
    message.channel
      .send({
        content: `Successfully Deleted Messages (This message will auto delete).`,
      }).then(msg => {
        setTimeout(() => {
          msg.delete().catch(e => {})
        }, 6000)
      })
      .catch((e) => {});
  } catch (e) {
    if (client.config.debugmode) return console.log(e);
  }
};

exports.info = {
  name: "purge",
  description: "A command.",
  aliases: ["clear", "bulkdel", "bulkdelete"],
};

// Credits:
// Physical Programming: Hyperz#0001
