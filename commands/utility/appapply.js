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

const moment = require('moment')
const { MessageEmbed } = require('discord.js')
var arrayofapps = [];
exports.run = async (client, message, args, con) => {

    const filter = m => m.author.id === message.author.id;
    var t;

    try {

        let fuckme = message.author.id
        const p = client.config.prefix

        if(!client.config.applications.enabled) return message.channel.send({ content: `This module is currently disabled.` }).catch(e => {});

        client.config.applications.apps.forEach(async a => {
            if(a.enabled) {
                await arrayofapps.push(`${a.name} - \`${p}apply ${a.cmdname}\``);
            }
        });

        if(arrayofapps.length > client.config.applications.apps.length) {
            arrayofapps = []
        }

        const avail = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setDescription(`**Applications:**\n\n${arrayofapps.join("\n")}`)

        if(!args[0]) return message.channel.send({ embeds: [avail] }).catch(e => {});

        let search = await client.channels.cache.find(c => c.name === `app-${message.author.username.toLowerCase()}`)
        if(search !== undefined) return message.channel.send({ content: `You already have an application open! <#${search.id}>` })

        let bruh = false;
        await client.config.applications.apps.forEach(async a => {
            if(a.cmdname === args[0]) {
                bruh = true;
            }
        });

        if(!bruh) return message.channel.send({ content: "That is not a valid application name." })

        let everyoneRole = await message.guild.roles.cache.find(role => role.name === "@everyone");
        console.log('EVERYONE ROLE LOL', everyoneRole.id)
        let permissionOverwriteArray = [{
                id: fuckme,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            {
                id: everyoneRole.id,
                deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
            {
                id: client.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
            },
        ]
        let thechannel;
        let hello = await message.guild.channels.create(`app-${message.author.username}`, {
            type: 'text'
        }).then(async (chan) => {
            thechannel = chan
            if(client.config.applications.categoryId !== "") {
                await chan.setParent(client.config.applications.categoryId, {lockPermissions: false})
            }
            chan.permissionOverwrites.set(permissionOverwriteArray)
            chan.setTopic(`Application for ${message.author.username}`)
            message.channel.send(`**Application Started in <#${chan.id}>**`).catch(e => {});
        }).catch(e => {});

        const starter = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`Hello! Before we begin let me tell you a couple of things!\n\n1️. Run \`${client.config.prefix}cancel\` at any time to stop the application.\n2️. This form must be filled out **HONESTLY**.\n3️. This form does **NOT** promise that you will be accepted.\n4️. If you lie on this application, you will be denied.\n\n Please send in chat **Yes** Or **No** if you agree to these terms.`)
        .setTimestamp()
        .setFooter(`${client.config.copyright}`)

        client.config.applications.apps.forEach(async a => {
            if(args[0] == a.cmdname) {

                if(!a.enabled) return message.channel.send({ content: `That application is currently not accepting responses.` }).catch(e => {});

                try {
                       thechannel.send({ embeds: [starter] }).then(() => {
                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                        .then(async collected => {
                            if(!collected.first()) return message.channel.send({ content: "omething went wrong!" })
                            let newcol = collected.first().content.toLowerCase()
                            if(newcol === "yes") { 
                                try {
                                    
                                    var qs = []
                                    a.questions.forEach(async q => {
                                        await qs.push(`\`${q.number}\` - ${q.content}`)
                                    });

                                    if(qs[0]) {
                                        var q0 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[0]}`)
                                    }
                                    if(qs[1]) {
                                        var q1 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[1]}`)
                                    }
                                    if(qs[2]) {
                                        var q2 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[2]}`)
                                    }
                                    if(qs[3]) {
                                        var q3 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[3]}`)
                                    }
                                    if(qs[4]) {
                                        var q4 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[4]}`)
                                    }
                                    if(qs[5]) {
                                        var q5 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[5]}`)
                                    }
                                    if(qs[6]) {
                                        var q6 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[6]}`)
                                    }
                                    if(qs[7]) {
                                        var q7 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[7]}`)
                                    }
                                    if(qs[8]) {
                                        var q8 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[8]}`)
                                    }
                                    if(qs[9]) {
                                        var q9 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[9]}`)
                                    }
                                    if(qs[10]) {
                                        var q10 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[10]}`)
                                    }
                                    if(qs[11]) {
                                        var q11 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[11]}`)
                                    }
                                    if(qs[12]) {
                                        var q12 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[12]}`)
                                    }
                                    if(qs[13]) {
                                        var q13 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[13]}`)
                                    }
                                    if(qs[14]) {
                                        var q14 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[14]}`)
                                    }
                                    if(qs[15]) {
                                        var q15 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[15]}`)
                                    }
                                    if(qs[16]) {
                                        var q16 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[16]}`)
                                    }
                                    if(qs[17]) {
                                        var q17 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[17]}`)
                                    }
                                    if(qs[18]) {
                                        var q18 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[18]}`)
                                    }
                                    if(qs[19]) {
                                        var q19 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[19]}`)
                                    }
                                    if(qs[20]) {
                                        var q20 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[20]}`)
                                    }
                                    if(qs[21]) {
                                        var q21 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[21]}`)
                                    }
                                    if(qs[22]) {
                                        var q22 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[22]}`)
                                    }
                                    if(qs[23]) {
                                        var q23 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[23]}`)
                                    }
                                    if(qs[24]) {
                                        var q24 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[24]}`)
                                    }
                                    if(qs[25]) {
                                        var q25 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[25]}`)
                                    }
                                    if(qs[26]) {
                                        var q26 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[26]}`)
                                    }
                                    if(qs[27]) {
                                        var q27 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[27]}`)
                                    }
                                    if(qs[28]) {
                                        var q28 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[28]}`)
                                    }
                                    if(qs[29]) {
                                        var q29 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[29]}`)
                                    }
                                    if(qs[30]) {
                                        var q30 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[30]}`)
                                    }
                                    if(qs[31]) {
                                        var q31 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[31]}`)
                                    }
                                    if(qs[32]) {
                                        var q32 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[32]}`)
                                    }
                                    if(qs[33]) {
                                        var q33 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[33]}`)
                                    }
                                    if(qs[34]) {
                                        var q34 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[34]}`)
                                    }
                                    if(qs[35]) {
                                        var q35 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[35]}`)
                                    }
                                    if(qs[36]) {
                                        var q36 = new MessageEmbed()
                                        .setColor(`${client.config.colorhex}`)
                                        .setDescription(`${qs[36]}`)
                                    }

                                    if(qs[0]) {
                                        try {

                                            var ans0;
                                            var ans1;
                                            var ans2;
                                            var ans3;
                                            var ans4;
                                            var ans5;
                                            var ans6;
                                            var ans7;
                                            var ans8;
                                            var ans9;
                                            var ans10;
                                            var ans11;
                                            var ans12;
                                            var ans13;
                                            var ans14;
                                            var ans15;
                                            var ans16;
                                            var ans17;
                                            var ans18;
                                            var ans19;
                                            var ans20;
                                            var ans21;
                                            var ans22;
                                            var ans23;
                                            var ans24;
                                            var ans25;
                                            var ans26;
                                            var ans27;
                                            var ans28;
                                            var ans29;
                                            var ans30;
                                            var ans31;
                                            var ans32;
                                            var ans33;
                                            var ans34;
                                            var ans35;
                                            var ans36;

                                        thechannel.send({ embeds: [q0] }).then(() => {
                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                            .then(async collected2 => {
                                                ans0 = `**Q:** ${qs[0]}\n**A:** ${collected2.first().content}`
                                                if(qs[1]) {
                                                    try {
                                                    thechannel.send({ embeds: [q1] }).then(() => {
                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                        .then(async collected2 => {
                                                            ans1 = `**Q:** ${qs[1]}\n**A:** ${collected2.first().content}`
                                                            if(qs[2]) {
                                                                try {
                                                                thechannel.send({ embeds: [q2] }).then(() => {
                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                    .then(async collected2 => {
                                                                        ans2= `**Q:** ${qs[2]}\n**A:** ${collected2.first().content}`
                                                                        if(qs[3]) {
                                                                            try {
                                                                            thechannel.send({ embeds: [q3] }).then(() => {
                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                .then(async collected2 => {
                                                                                    ans3 = `**Q:** ${qs[3]}\n**A:** ${collected2.first().content}`
                                                                                    if(qs[4]) {
                                                                                        try {
                                                                                        thechannel.send({ embeds: [q4] }).then(() => {
                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                            .then(async collected2 => {
                                                                                                ans4 = `**Q:** ${qs[4]}\n**A:** ${collected2.first().content}`
                                                                                                if(qs[5]) {
                                                                                                    try {
                                                                                                    thechannel.send({ embeds: [q5] }).then(() => {
                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                        .then(async collected2 => {
                                                                                                            ans5 = `**Q:** ${qs[5]}\n**A:** ${collected2.first().content}`
                                                                                                            if(qs[6]) {
                                                                                                                try {
                                                                                                                thechannel.send({ embeds: [q6] }).then(() => {
                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                    .then(async collected2 => {
                                                                                                                        ans6 = `**Q:** ${qs[6]}\n**A:** ${collected2.first().content}`
                                                                                                                        if(qs[7]) {
                                                                                                                            try {
                                                                                                                            thechannel.send({ embeds: [q7] }).then(() => {
                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                .then(async collected2 => {
                                                                                                                                    ans7 = `**Q:** ${qs[7]}\n**A:** ${collected2.first().content}`
                                                                                                                                    if(qs[8]) {
                                                                                                                                        try {
                                                                                                                                        thechannel.send({ embeds: [q8] }).then(() => {
                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                            .then(async collected2 => {
                                                                                                                                                ans8 = `**Q:** ${qs[8]}\n**A:** ${collected2.first().content}`
                                                                                                                                                if(qs[9]) {
                                                                                                                                                    try {
                                                                                                                                                    thechannel.send({ embeds: [q9] }).then(() => {
                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                            ans9 = `**Q:** ${qs[9]}\n**A:** ${collected2.first().content}`
                                                                                                                                                            if(qs[10]) {
                                                                                                                                                                try {
                                                                                                                                                                thechannel.send({ embeds: [q10] }).then(() => {
                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                        ans10 = `**Q:** ${qs[10]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                        if(qs[11]) {
                                                                                                                                                                            try {
                                                                                                                                                                            thechannel.send({ embeds: [q11] }).then(() => {
                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                    ans11 = `**Q:** ${qs[11]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                    if(qs[12]) {
                                                                                                                                                                                        try {
                                                                                                                                                                                        thechannel.send({ embeds: [q12] }).then(() => {
                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                ans12 = `**Q:** ${qs[12]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                if(qs[13]) {
                                                                                                                                                                                                    try {
                                                                                                                                                                                                    thechannel.send({ embeds: [q13] }).then(() => {
                                                                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                            ans13 = `**Q:** ${qs[13]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                            if(qs[14]) {
                                                                                                                                                                                                                try {
                                                                                                                                                                                                                thechannel.send({ embeds: [q14] }).then(() => {
                                                                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                        ans14 = `**Q:** ${qs[14]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                        if(qs[15]) {
                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                            thechannel.send({ embeds: [q15] }).then(() => {
                                                                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                    ans15 = `**Q:** ${qs[15]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                    if(qs[16]) {
                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                        thechannel.send({ embeds: [q16] }).then(() => {
                                                                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                ans16 = `**Q:** ${qs[16]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                if(qs[17]) {
                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                    thechannel.send({ embeds: [q17] }).then(() => {
                                                                                                                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                            ans17 = `**Q:** ${qs[17]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                            if(qs[18]) {
                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                thechannel.send({ embeds: [q18] }).then(() => {
                                                                                                                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                        ans18 = `**Q:** ${qs[18]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                        if(qs[19]) {
                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                            thechannel.send({ embeds: [q19] }).then(() => {
                                                                                                                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                    ans19 = `**Q:** ${qs[19]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                    if(qs[20]) {
                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                        thechannel.send({ embeds: [q20] }).then(() => {
                                                                                                                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                ans20 = `**Q:** ${qs[20]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                if(qs[21]) {
                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                    thechannel.send({ embeds: [q21] }).then(() => {
                                                                                                                                                                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                            ans21 = `**Q:** ${qs[21]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                            if(qs[22]) {
                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                thechannel.send({ embeds: [q22] }).then(() => {
                                                                                                                                                                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                        ans22 = `**Q:** ${qs[22]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                        if(qs[23]) {
                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                            thechannel.send({ embeds: [q23] }).then(() => {
                                                                                                                                                                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                    ans23 = `**Q:** ${qs[23]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                    if(qs[24]) {
                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                        thechannel.send({ embeds: [q24] }).then(() => {
                                                                                                                                                                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                ans24 = `**Q:** ${qs[24]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                if(qs[25]) {
                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                    thechannel.send({ embeds: [q25] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                            ans25 = `**Q:** ${qs[25]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                            if(qs[26]) {
                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                thechannel.send({ embeds: [q26] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                        ans26 = `**Q:** ${qs[26]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                        if(qs[27]) {
                                                                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                                                                            thechannel.send({ embeds: [q27] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                    ans27 = `**Q:** ${qs[27]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                    if(qs[28]) {
                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                        thechannel.send({ embeds: [q28] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                ans28 = `**Q:** ${qs[28]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                if(qs[29]) {
                                                                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                                                                    thechannel.send({ embeds: [q29] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                            ans29 = `**Q:** ${qs[29]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                            if(qs[30]) {
                                                                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                                                                thechannel.send({ embeds: [q30] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                        ans30 = `**Q:** ${qs[30]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                        if(qs[31]) {
                                                                                                                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                                                                                                                            thechannel.send({ embeds: [q31] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                    ans31 = `**Q:** ${qs[31]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                    if(qs[32]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                                                                        thechannel.send({ embeds: [q32] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                ans32 = `**Q:** ${qs[32]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                if(qs[33]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    thechannel.send({ embeds: [q33] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                        .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                            ans33 = `**Q:** ${qs[33]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                            if(qs[34]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                thechannel.send({ embeds: [q34] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ans34 = `**Q:** ${qs[34]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(qs[35]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            thechannel.send({ embeds: [q35] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ans35 = `**Q:** ${qs[35]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if(qs[36]) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        thechannel.send({ embeds: [q36] }).then(() => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            thechannel.awaitMessages({ filter, max: 1, time: 1000000, errors: ['time'] })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            .then(async collected2 => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ans36 = `**Q:** ${qs[36]}\n**A:** ${collected2.first().content}`
                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                });
                                                                                                                                                                                                                } catch(e) {
                                                                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                                }
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                            }
                                                                                                                                                                                                        });
                                                                                                                                                                                                    });
                                                                                                                                                                                                    } catch(e) {
                                                                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                                    }
                                                                                                                                                                                                } else {
                                                                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                                }
                                                                                                                                                                                            });
                                                                                                                                                                                        });
                                                                                                                                                                                        } catch(e) {
                                                                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                                                                        }
                                                                                                                                                                                    } else {
                                                                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                                    }
                                                                                                                                                                                });
                                                                                                                                                                            });
                                                                                                                                                                            } catch(e) {
                                                                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                                                                            }
                                                                                                                                                                        } else {
                                                                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                                        }
                                                                                                                                                                    });
                                                                                                                                                                });
                                                                                                                                                                } catch(e) {
                                                                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                                                                }
                                                                                                                                                            } else {
                                                                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                            }
                                                                                                                                                        });
                                                                                                                                                    });
                                                                                                                                                    } catch(e) {
                                                                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                                                                    }
                                                                                                                                                } else {
                                                                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        });
                                                                                                                                        } catch(e) {
                                                                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                                                                        }
                                                                                                                                    } else {
                                                                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            });
                                                                                                                            } catch(e) {
                                                                                                                                if(client.config.debugmode) return console.log(e);
                                                                                                                            }
                                                                                                                        } else {
                                                                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                                        }
                                                                                                                    });
                                                                                                                });
                                                                                                                } catch(e) {
                                                                                                                    if(client.config.debugmode) return console.log(e);
                                                                                                                }
                                                                                                            } else {
                                                                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                            }
                                                                                                        });
                                                                                                    });
                                                                                                    } catch(e) {
                                                                                                        if(client.config.debugmode) return console.log(e);
                                                                                                    }
                                                                                                } else {
                                                                                                    completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                                }
                                                                                            });
                                                                                        });
                                                                                        } catch(e) {
                                                                                            if(client.config.debugmode) return console.log(e);
                                                                                        }
                                                                                    } else {
                                                                                        completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                                    }
                                                                                });
                                                                            });
                                                                            } catch(e) {
                                                                                if(client.config.debugmode) return console.log(e);
                                                                            }
                                                                        } else {
                                                                            completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                                        }
                                                                    });
                                                                });
                                                                } catch(e) {
                                                                    if(client.config.debugmode) return console.log(e);
                                                                }
                                                            } else {
                                                                completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                            }
                                                        });
                                                    });
                                                    } catch(e) {
                                                        if(client.config.debugmode) return console.log(e);
                                                    }
                                                } else {
                                                    completed(Hyperz, client, config, message, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36)
                                                }
                                            });
                                        });
                                        } catch(e) {
                                            if(client.config.debugmode) return console.log(e);
                                        }
                                    }

                                } catch(e) {

                                    if(client.config.debugmode) return console.log(e);

                                }
                            } else if(newcol === "no") {
                                thechannel.send({ content: `You are required to accept our terms to continue your app. Cancelling your application now...` }).catch(e => {if(client.config.debugmode) return console.log(e);});
                                setTimeout(async() => {
                                    thechannel.delete().catch(e => {});
                                }, 10000)
                            } else {
                                thechannel.send({ content: `That is an invalid response. Cancelling your application now...` }).catch(e => {if(client.config.debugmode) return console.log(e);});
                                setTimeout(async() => {
                                    thechannel.delete().catch(e => {});
                                }, 10000)
                            }
                        });
                       }).catch(e => {})
                } catch(e) {}

            }
        });
    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }

}

async function completed(client, message, thechannel, a, qs, ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15, ans16, ans17, ans18, ans19, ans20, ans21, ans22, ans23, ans24, ans25, ans26, ans27, ans28, ans29, ans30, ans31, ans32, ans33, ans34, ans35, ans36) {
try {
    thechannel.send({ content: `Your application has been completed, please wait for a response back, this may take awhile.\n**We have stored your answers, this channel will be removed shortly!**` })
    
    setTimeout(async() => {
        thechannel.delete().catch(e => {});
    }, 10000)

    const theguild = client.guilds.cache.get(client.config.your_guild_id)
    if(!theguild) return console.log(theguild)

    const chantosend = theguild.channels.cache.get(a.loggingchannelid)
    if(!chantosend) return console.log(chantosend)

    let datetime = moment().format(client.config.date_format)

    var log1;
    var log2;
    var log3;
    var log4;
    var log5;
    var log6;
    var log7;

    if(!ans0) {
        ans0 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans1) {
        ans1 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans2) {
        ans2 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans3) {
        ans3 = '__No Question Provided (End Of Questions)__'
    }

    if(!ans4) {
        ans4 = '__No Question Provided (End Of Questions)__'
    }

    // up to 5
    log1 = new MessageEmbed()
    .setColor(`${client.config.colorhex}`)
    .setTitle(`${a.name} - Part 1`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans0}\n\n${ans1}\n\n${ans2}\n\n${ans3}\n\n${ans4}`)
    .setFooter(`This application only has ${qs.length} questions!`)
    chantosend.send({ embeds: [log1] }).catch(e => {
        console.log(e)
    });

    // up to 10
    if(qs[5]) {

        if(!ans5) {
            ans5 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans6) {
            ans6 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans7) {
            ans7 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans8) {
            ans8 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans9) {
            ans9 = '__No Question Provided (End Of Questions)__'
        }

        log2 = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setTitle(`${a.name} - Part 2`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans5}\n\n${ans6}\n\n${ans7}\n\n${ans8}\n\n${ans9}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send({ embeds: [log2] }).catch(e => {
            console.log(e)
        });
    }

    // up to 15
    if(qs[10]) {

        if(!ans10) {
            ans10 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans11) {
            ans11 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans12) {
            ans12 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans13) {
            ans13 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans14) {
            ans14 = '__No Question Provided (End Of Questions)__'
        }

        log3 = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setTitle(`${a.name} - Part 3`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans10}\n\n${ans11}\n\n${ans12}\n\n${ans13}\n\n${ans14}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send({ embeds: [log3] }).catch(e => {
            console.log(e)
        });
    }

    // up to 20
    if(qs[15]) {

        if(!ans15) {
            ans15 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans16) {
            ans16 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans17) {
            ans17 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans18) {
            ans18 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans19) {
            ans19 = '__No Question Provided (End Of Questions)__'
        }

        log4 = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setTitle(`${a.name} - Part 4`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans15}\n\n${ans16}\n\n${ans17}\n\n${ans18}\n\n${ans19}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send({ embeds: [plog4] }).catch(e => {
            console.log(e)
        });
    }

    // up to 25
    if(qs[20]) {

        if(!ans20) {
            ans20 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans21) {
            ans21 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans22) {
            ans22 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans23) {
            ans23 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans24) {
            ans24 = '__No Question Provided (End Of Questions)__'
        }

        log5 = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setTitle(`${a.name} - Part 5`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans20}\n\n${ans21}\n\n${ans22}\n\n${ans23}\n\n${ans24}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send({ embeds: [log5] }).catch(e => {
            console.log(e)
        });
    }

    // up to 30
    if(qs[25]) {

        if(!ans25) {
            ans25 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans26) {
            ans26 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans27) {
            ans27 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans28) {
            ans28 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans29) {
            ans29 = '__No Question Provided (End Of Questions)__'
        }

        log6 = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setTitle(`${a.name} - Part 6`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans25}\n\n${ans26}\n\n${ans27}\n\n${ans28}\n\n${ans29}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send({ embeds: [log6] }).catch(e => {
            console.log(e)
        });
    }

    // up to 36
    if(qs[30]) {

        if(!ans30) {
            ans30 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans31) {
            ans31 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans32) {
            ans32 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans33) {
            ans33 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans34) {
            ans34 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans35) {
            ans35 = '__No Question Provided (End Of Questions)__'
        }

        if(!ans36) {
            ans36 = '__No Question Provided (End Of Questions)__'
        }

        log7 = new MessageEmbed()
        .setColor(`${client.config.colorhex}`)
        .setTitle(`${a.name} - Part 7`)
        .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Date:** ${datetime}\n\n**Application:**\n\n${ans30}\n\n${ans31}\n\n${ans32}\n\n${ans33}\n\n${ans34}\n\n${ans35}\n\n${ans36}`)
        .setFooter(`This application only has ${qs.length} questions!`)
        chantosend.send({ embeds: [log7] }).catch(e => {
            console.log(e)
        });
    }

} catch(e) {
    if(client.config.debugmode) return console.log(e);
}
}

exports.info = {
    name: 'appapply',
    description: 'Apply for something ig?',
    aliases: ['apply', 'application', 'form']
}
