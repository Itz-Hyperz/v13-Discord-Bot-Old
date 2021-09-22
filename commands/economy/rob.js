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
    if(!client.config.economy_module.robCommand) return message.channel.send({ content: "This module is disabled." }).catch(e => {});
    await con.query(`SELECT * FROM users WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            if(row[0].robCooldown === 'false') {

                let target;
                if(message.mentions.users.first()) {
                    target = await client.utils.memberFetch(client, message.guild, message.mentions.users.first().id)
                } else if(!isNaN(args[0])) {
                    target = await client.utils.memberFetch(client, message.guild, args[0])
                } else {
                    return message.channel.send({ content: "I was unable to find that user." }).catch(e => {});
                }
                if(target == undefined) return message.channel.send({ content: "You need to include a user to rob." }).catch(e => {});

                await con.query(`SELECT * FROM users WHERE userid='${target.user.id}'`, async (err, row) => {
                    if(err) throw err;
                    if(row[0]) {
                        let thetake;
                        if(row[0].balance <= 10) return message.channel.send({ content: "This user has too little money to be robbed." }).catch(e => {});
                        if(row[0].balance < 50) {
                            thetake = 19
                        } else if(row[0].balance < 100) {
                            thetake = 53
                        } else if(row[0].balance < 150) {
                            thetake = 78
                        } else if(row[0].balance < 200) {
                            thetake = 89
                        } else if(row[0].balance < 250) {
                            thetake = 127
                        } else if(row[0].balance < 500) {
                            thetake = 200
                        } else if(row[0].balance < 750) {
                            thetake = 346
                        } else if(row[0].balance < 1000) {
                            thetake = 476
                        } else {
                            thetake = 865
                        }
                        setTimeout(async () => {
                            await con.query(`UPDATE users SET balance = balance + ${thetake}, robCooldown='true' WHERE userid='${message.author.id}'`, async (err, row) => {
                                if(err) throw err;
                            });
                            await con.query(`UPDATE users SET balance = balance - ${thetake} WHERE userid='${target.user.id}'`, async (err, row) => {
                                if(err) throw err;
                            });
                            message.channel.send({ content: `You have robbed ${target.user.tag} for ${client.config.econCurrency}${thetake}` }).catch(e => {});
                            setTimeout(async () => {
                                await con.query(`UPDATE users SET robCooldown='false' WHERE userid='${message.author.id}'`, async (err, row) => {
                                    if(err) throw err;
                                });
                            }, 7200000)
                        }, 200)
                    }
                });
            } else {
                message.channel.send({ content: "You are still on cooldown, you must wait 2 hours after your original command to do this again." }).catch(e => {});
            }
        }
    });

}

exports.info = {
    name: "rob",
    description: "A way to make money in the economy.",
    aliases: ['dorob']
}