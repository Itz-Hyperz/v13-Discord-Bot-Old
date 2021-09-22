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
    if(!client.config.economy_module.workCommand) return message.channel.send({ content: "This module is disabled." }).catch(e => {});
    await con.query(`SELECT * FROM users WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            if(row[0].workCooldown === 'false') {
                const responses = client.config.workEcon

                let answer = await client.utils.maths(responses)

                await con.query(`UPDATE users SET balance = balance + ${answer.amount}, workCooldown='true' WHERE userid='${message.author.id}'`, async (err, row) => {
                    if(err) throw err;
                });
                message.channel.send({ content: `${answer.text}${client.config.econCurrency}${answer.amount}` }).catch(e => {});
                setTimeout(async () => {
                    await con.query(`UPDATE users SET workCooldown='false' WHERE userid='${message.author.id}'`, async (err, row) => {
                        if(err) throw err;
                    });
                }, 7200000)
            } else {
                message.channel.send({ content: "You are still on cooldown, you must wait 2 hours after your original command to do this again." }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {});
            }
        }
    });

}

exports.info = {
    name: "work",
    description: "A way to make money in the economy.",
    aliases: ['dowork']
}