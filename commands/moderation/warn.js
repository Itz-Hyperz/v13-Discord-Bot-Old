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
      .catch((e) => {});

  let check = await client.utils.permCheck(client, message, "moderation");
  if (!check)
    return message.channel
      .send({ content: "You don't have permission to use this command." })
      .catch((e) => {});

  let pingeduser;
  if (message.mentions.users.first()) {
    pingeduser = await client.utils.userFetch(
      client,
      message.mentions.users.first().id
    );
  } else if (!isNaN(args[0])) {
    pingeduser = await client.utils.userFetch(client, args[0]);
  } else {
    return message.channel
      .send({ content: "I was unable to find that user." })
      .catch((e) => {});
  }

  if (pingeduser) {
    if (!args[1]) {
      try {
        const warnEmbed = new MessageEmbed()
          .setColor(client.config.colorhex)
          .setTitle(`⚠️ You've Been Warned! ⚠️`)
          .addFields(
            {
              name: `Warned By:`,
              value: `${message.author.tag}`,
              inline: true,
            },
            { name: `Guild:`, value: `${message.guild.name}`, inline: true },
            {
              name: `Reason:`,
              value: `This is your warning to stop, if you continue, you will face the consequences!`,
            }
          )
          .setTimestamp()
          .setFooter(`${client.config.copyright}`);

        message.channel
          .send({ content: `${pingeduser.tag} has been warned for \`N/A\`` })
          .catch((e) => {});

        pingeduser.send({ embeds: [warnEmbed] }).then(() => {
          message.channel
            .send({
              content: `I have successfully alerted the user privately.`,
            })
            .catch((e) => {});
        });

        await con.query(
          `SELECT * FROM users WHERE userid='${pingeduser.id}'`,
          async (err, row) => {
            await con.query(
              `UPDATE users SET warns = warns + 1 WHERE userid='${pingeduser.id}'`,
              async (err, row) => {}
            );
          }
        );

        await con.query(
          `SELECT COUNT(uniqueid) as total FROM cases`,
          async (err, row) => {
            let uniqueid = row[0].total + 1;
            await con.query(
              `INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${pingeduser.id}', 'No Reason Provided.', '${uniqueid}', '${message.author.id}', 'Warning')`,
              async (err, row) => {}
            );
          }
        );

        if (client.config.logging_module.punishments) {
          client.config.logging_module.punishmentsChannels.forEach(
            async (chan) => {
              const thechannel = client.channels.cache.get(chan);
              if (!thechannel) {
                console.log(
                  "One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names."
                );
              } else {
                const logembed = new MessageEmbed()
                  .setColor(
                    `${
                      client.config.logging_module.punishmentsColorhex ||
                      client.config.colorhex
                    }`
                  )
                  .setAuthor(
                    `Action Logs - User Warned`,
                    client.user.displayAvatarURL()
                  )
                  .addFields(
                    { name: `Enforcer:`, value: `${message.author.tag}` },
                    { name: `User ID:`, value: `${pingeduser.id}` },
                    { name: `User Tag:`, value: `${pingeduser.tag}` },
                    { name: `Reason:`, value: `No reason provided.` }
                  )
                  .setTimestamp()
                  .setFooter(`${client.config.copyright}`);
                thechannel.send({ embeds: [logembed] }).catch((e) => {});
              }
            }
          );
        }
      } catch (e) {
        if (client.config.debugmode) return console.log(e);
      }
    } else {
      try {
        const warnEmbed = new MessageEmbed()
          .setColor(client.config.colorhex)
          .setTitle(`⚠️ You've Been Warned! ⚠️`)
          .addFields(
            {
              name: `Warned By:`,
              value: `${message.author.tag}`,
              inline: true,
            },
            { name: `Guild:`, value: `${message.guild.name}`, inline: true },
            { name: `Reason:`, value: `${args.slice(1).join(" ")}` }
          )
          .setTimestamp()
          .setFooter(`${client.config.copyright}`);

        message.channel
          .send({
            content: `${pingeduser.tag} has been warned for \`${args
              .slice(1)
              .join(" ")}\``,
          })
          .catch((e) => {});

        let refinedreason = args
          .slice(1)
          .join(" ")
          .replace("'", "")
          .replace("`", "")
          .replace("\\", "")
          .replace(";", "");

        pingeduser.send({ embeds: [warnEmbed] }).then((msg) => {
          message.channel
            .send({
              content: `I have successfully alerted the user privately.`,
            })
            .catch((e) => {});
        });

        await con.query(
          `SELECT * FROM users WHERE userid='${pingeduser.id}'`,
          async (err, row) => {
            await con.query(
              `UPDATE users SET warns = warns + 1 WHERE userid='${pingeduser.id}'`,
              async (err, row) => {}
            );
          }
        );

        await con.query(
          `SELECT COUNT(uniqueid) as total FROM cases`,
          async (err, row) => {
            let uniqueid = row[0].total + 1;
            await con.query(
              `INSERT INTO cases (userid, reason, uniqueid, enforcerid, type) VALUES ('${pingeduser.id}', '${refinedreason}', '${uniqueid}', '${message.author.id}', 'Warning')`,
              async (err, row) => {}
            );
          }
        );

        if (client.config.logging_module.punishments) {
          client.config.logging_module.punishmentsChannels.forEach(
            async (chan) => {
              const thechannel = client.channels.cache.get(chan);
              if (!thechannel) {
                console.log(
                  "One of the channels entered in the config.js file is not properly configured. Please make sure you use Channel ID's. Not Names."
                );
              } else {
                const logembed = new MessageEmbed()
                  .setColor(
                    `${
                      client.config.logging_module.punishmentsColorHex ||
                      client.config.colorhex
                    }`
                  )
                  .setAuthor(
                    `Action Logs - User Warned`,
                    client.user.displayAvatarURL()
                  )
                  .addFields(
                    { name: `Enforcer:`, value: `${message.author.tag}` },
                    { name: `User ID:`, value: `${pingeduser.id}` },
                    { name: `User Tag:`, value: `${pingeduser.tag}` },
                    { name: `Reason:`, value: `${args.slice(1).join(" ")}` }
                  )
                  .setTimestamp()
                  .setFooter(`${client.config.copyright}`);
                thechannel.send({ embeds: [logembed] }).catch((e) => {});
              }
            }
          );
        }
      } catch (e) {
        if (client.config.debugmode) return console.log(e);
      }
    }
  } else {
    message.channel
      .send({ content: `I was unable to find that user.` })
      .catch((e) => {});
  }
};

exports.info = {
  name: "warn",
  description: "Warns a user.",
  aliases: ["issuewarn", "wrn"],
};
