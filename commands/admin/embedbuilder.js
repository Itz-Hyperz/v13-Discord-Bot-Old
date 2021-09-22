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

  let check = await client.utils.permCheck(client, message, 'moderation')
  if(!check) return message.channel.send({ content: "You don't have permission to use this command." }).catch(e => {});

      var thechannel;
      const filter = m => m.author.id === message.author.id;

      const starter = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`**EMBED BUILDER STARTED!**\nType \`end\` to cancel the builder.`)

      const builder0 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define a **channel** to put this embed in.`)

      const builder1 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define an **author**.\nType \`na\` to skip this step.`)

      const builder2 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define a **color HEX**.\nType \`na\` to skip this step.`)

      const builder3 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define a **title**.\nType \`na\` to skip this step.`)

      const builder4 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define a **thumbnail image link**.\nType \`na\` to skip this step.`)

      const builder5 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define a **description**.\nType \`na\` to skip this step.`)

      const builder6 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define an **image link**.\nType \`na\` to skip this step.`)

      const builder7 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`Please define a **footer**.\nType \`na\` to skip this step.`)

      const finish1 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`**Embed is being built...**`)

      const finish2 = new MessageEmbed()
      .setColor(`${client.config.colorhex}`)
      .setDescription(`**Embed has been posted!**`)

      message.channel.send({ embeds: [starter] }).catch(e => {});

      message.channel.send({ embeds: [builder0] }).then(() => {
        message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
        .then(collected => {
            let content0l = collected.first().content.toLowerCase()
            let content0 = collected.first().content

            if(content0l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});

            if(collected.first().mentions.channels.first()) {
              thechannel = collected.first().mentions.channels.first().id
            } else if(!isNaN(collected.first().content)) {
              thechannel = collected.first().content
            }

            if(thechannel == undefined) return message.channel.send({ content: `Embed process cancelled, I was unable to find the provided channel.` });

            message.channel.send({ embeds: [builder1] }).then(() => {
              message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
              .then(collected => {
                  let content1l = collected.first().content.toLowerCase()
                  let content1 = collected.first().content
      
                  if(content1l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
      
                  message.channel.send({ embeds: [builder2] }).then(() => {
                    message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                    .then(collected => {
                        let content2l = collected.first().content.toLowerCase()
                        let content2 = collected.first().content
            
                        if(content2l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
            
                        message.channel.send({ embeds: [builder3] }).then(() => {
                          message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                          .then(collected => {
                              let content3l = collected.first().content.toLowerCase()
                              let content3 = collected.first().content
                  
                              if(content3l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
                  
                              message.channel.send({ embeds: [builder4] }).then(() => {
                                message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                .then(collected => {
                                    let content4l = collected.first().content.toLowerCase()
                                    let content4 = collected.first().content
                        
                                    if(content4l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
                        
                                    message.channel.send({ embeds: [builder5] }).then(() => {
                                      message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                      .then(collected => {
                                          let content5l = collected.first().content.toLowerCase()
                                          let content5 = collected.first().content
                              
                                          if(content5l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
                              
                                          message.channel.send({ embeds: [builder6] }).then(() => {
                                            message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                            .then(collected => {
                                                let content6l = collected.first().content.toLowerCase()
                                                let content6 = collected.first().content
                                    
                                                if(content6l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
                                    
                                                message.channel.send({ embeds: [builder7] }).then(() => {
                                                  message.channel.awaitMessages({ filter, max: 1, time: 100000, errors: ['time'] })
                                                  .then(collected => {
                                                      let content7l = collected.first().content.toLowerCase()
                                                      let content7 = collected.first().content
                                          
                                                      if(content7l === 'end') return message.channel.send({ content: `**Embed Builder Cancelled!**` }).catch(e => {});
                                          
                                                      message.channel.send({ embeds: [finish1] }).catch(e => {});
                                                      embedBuilder(client, thechannel, message, content1, content2, content3, content4, content5, content6, content7)
                                                      setTimeout(() => {
                                                        message.channel.send({ embeds: [finish2] })
                                                      }, 3000)
                                          
                                                  }).catch(e => {});
                                                }).catch(e => {});
                                    
                                            }).catch(e => {});
                                          }).catch(e => {});
                              
                                      }).catch(e => {});
                                    }).catch(e => {});
                        
                                }).catch(e => {});
                              }).catch(e => {});
                  
                          }).catch(e => {});
                        }).catch(e => {});
            
                    }).catch(e => {});
                  }).catch(e => {});
      
              }).catch(e => {});
            }).catch(e => {});

        }).catch(e => {});
      }).catch(e => {});
}

async function embedBuilder(client, thechannel, message, content1, content2, content3, content4, content5, content6, content7) {

  var chan;

  try {
    chan = await client.channels.cache.get(thechannel)
  } catch(e) {
    console.log(e)
  }
    if(chan == undefined) return message.channel.send({ content: `The channel provided was invalid...` });

    const finalizer = new MessageEmbed()

    if(content1 != 'na') {
      try { finalizer.setAuthor(content1) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding an author.` })}
    }
    if(content2 != 'na') {
      try { finalizer.setColor(content2) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding a color hex.` })}
    }
    if(content3 != 'na') {
      try { finalizer.setTitle(content3) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding a title.` })}
    }
    if(content4 != 'na') {
      try { finalizer.setThumbnail(content4) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding a thumbnail.` })}
    }
    if(content5 != 'na') {
      try { finalizer.setDescription(content5) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding a description.` })}
    }
    if(content6 != 'na') {
      try { finalizer.setImage(content6) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding an image.` })}
    }
    if(content7 != 'na') {
      try { finalizer.setFooter(content7) } catch(e) { if(e) return message.channel.send({ content: `Something went *wrong* when adding a footer.` })}
    }

    try {
      await chan.send({ embeds: [finalizer] }).catch(e => { console.log(e) });
    } catch(e) {
      if(client.config.debugmode) return console.log(e)
    }

}

exports.info = {
  name: "embedbuilder",
  description: "Leave a review.",
  aliases: ['buildembed', 'advembed', 'advancedembed', 'makeembed', 'newembed']
}