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
    if(!client.config.economy_module.withdrawCommand) return message.channel.send({ content: "This module is disabled." }).catch(e => {});
    if(!args[0]) return message.channel.send({ content: "Please include an amount to withdraw." }).catch(e => {});

    let check = args.join(" ").replace("-", "")
    let amount = Number(check)
    if(!amount) return message.channel.send({ content: "Please include an amount to deposit." }).catch(e => {});

    await con.query(`SELECT * FROM users WHERE userid='${message.author.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            if(amount > row[0].bank) return message.channel.send({ content: "You don't have that much money in your bank." }).catch(e => {});
            await con.query(`UPDATE users SET balance = balance + ${amount}, bank = bank - ${amount} WHERE userid='${message.author.id}'`, async (err, row) => {
                if(err) throw err;
                message.channel.send({ content: `Withdrew \`${client.config.econCurrency}${amount}\` from your bank!` }).then((msg) => {
                    if(client.config.deleteCommands) {
                        setTimeout(() => {
                            msg.delete().catch(e => {});
                        }, 14000);
                    }
                }).catch(e => {});
            });
        }
    });

}

exports.info = {
    name: "withdraw",
    description: "A way to make money in the economy.",
    aliases: []
}