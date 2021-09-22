const _config = {

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

    // Client Settings (REQUIRED)
    prefix: "h!", // The prefix to run all commands inside of the bot
    token: "YOUR_BOT_TOKEN", // The token from your Discord Dev Portal
    your_guild_id: "YOUR_SERVER_ID", // This is where you would put your server ID.
    aboutServer: "This bot has over 90 Commands, has an excessively customizabled configuration file, and can make your server look professional and clean! Feel free to buy it [here](https://hyperz.dev/)!", // This is a description of your server
    date_format: "MM-DD-YYYY HH:mm", // The date format for the bot
    copyright: "© 2021 Your Name", // The footer for most embeds
    colorhex: "#426cf5", // The main theme and color of the bot
    voicechanneltojoin: "VOICE_CHANNEL_ID", // A voice channel the bot will sit in on startup
    deleteCommands: false, // This will decide whether or not to delete commands when they are ran.

    // Application Settings (REQUIRED)
    themeColor: "blue", // The theme color for the main logger (blue, red, green, yellow, magenta)
    port: "8080", // The port for the bot to listen on
    debugmode: false, // Toggles the logging of errors and excess information
    logCommandLoading: false, // Toggles the logging of commands being loaded

    // Presence Settings (REQUIRED)
    presence: [
        {name: "HD-Client", type: "PLAYING", status: "dnd"}, // The bot will cycle through these
        {name: "This Server", type: "WATCHING", status: "dnd"}, // The bot will cycle through these
        {name: "Jellys Music", type: "LISTENING", status: "dnd"} // The bot will cycle through these
    ],

    // MySQL Settings (REQUIRED)
    database: {
        host: "localhost", // The IP of your SQL Server
        user: "root", // The username for your SQL Server
        password: "", // The password for of the user for your SQL Server
        database: "hdclient" // The database designated for the bot
    },

    // User Join Settings
    user_join_module: {
        enabled: false, // Toggle on or off

        verificationSystem: false, // Toggle on or off
        dmVerification: false, // Should the bot DM the user to remind them to verify themselves
        verifiedRoleIds: ['SOME_ROLE_ID_HERE'], // Roles for a user to get AFTER they verify
        verificationChannelId: "CHANNEL_ID_HERE", // Put the verification channel ID You plan to have users use here

        autoRoleSystem: false, // Toggle on or off
        autoRoleIds: ['SOME_ROLE_ID_HERE'], // Roles for a user to get when they JOIN the server

        channelIds: ["ID_HERE"], // The channels to send the welcome message(s) to.
        messageType: 3, // 1 = Normal Message, 2 = Embeded Message, 3 = Card Message (image)
        message: "Please read the rules for the server!", // Only fill this out if the messageType = 1

        embedMessage: { // Only fill this out if messageType = 2
            colorHex: "#FFFFFF", // The color HEX for the embed
            header: "Welcome User!", // The header for the embed
            notice: "Please read the rules for the server!", // The notice for the embed, if empty it won't have one
            footer: "", // The footer for the embed, if empty it will go back to the default copyright
            showAccountDate: false // Will show the date of the account being created when they join if false
        },

        cardMessage: { // Only fill this out if messageType = 3
            serverName: "", // If your server name is long, you can use this to customize it for the bot, if empty, it will use your server name
            borderColorHex: "#8015EA", // The border color of the card
            usernameBoxColorHex: "#8015EA", // The username box color of the card
            discriminatorBoxColorHex: "#8015EA", // The discriminator bot color of the card
            messageBoxColorHex: "#8015EA", // The message box color of the card
            titleColorHex: "#8015EA", // The title color of the card
            avatarColorHex: "#8015EA", // The avatar border color of the card
            backgroundImageURL: "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" // The image for the background of the card
        }
    },

    // User Leave Settings
    user_leave_module: {
        enabled: false, // Toggle on or off

        channelIds: ["ID_HERE"], // The channels to send the leave message(s) to.
        messageType: 3, // 1 = Normal Message, 2 = Embeded Message, 3 = Card Message (image)
        message: "Please read the rules for the server!", // Only fill this out if the messageType = 1

        embedMessage: { // Only fill this out if messageType = 2
            colorHex: "#FFFFFF", // The color HEX for the embed
            header: "Welcome User!", // The header for the embed
            notice: "Please read the rules for the server!", // The notice for the embed, if empty it won't have one
            footer: "", // The footer for the embed, if empty it will go back to default
            showAccountDate: false // Will show the date of the account being created when they join if true
        },

        cardMessage: { // Only fill this out if messageType = 3
            serverName: "", // If your server name is long, you can use this to customize it for the bot, if empty, it will use your server name
            borderColorHex: "#8015EA", // The border color of the card
            usernameBoxColorHex: "#8015EA", // The username box color of the card
            discriminatorBoxColorHex: "#8015EA", // The discriminator bot color of the card
            messageBoxColorHex: "#8015EA", // The message box color of the card
            titleColorHex: "#8015EA", // The title color of the card
            avatarColorHex: "#8015EA", // The avatar border color of the card
            backgroundImageURL: "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" // The image for the background of the card
        }
    },

    // Server Stats Settings
    serverstats_module: {
        enabled: false, // Toggle on or off

        useMemberCount: false, // Toggle on or off the member count channel
        membercountchannelid: "your-member-count-channel-id", // Channel ID of the channel

        useUserCount: false,  // Toggle on or off the user count channel (no bots)
        usercountchannelid: "your-user-count-channel-id", // Channel ID of the channel

        useBotCount: false, // Toggle on or off the bot count channel (no users)
        botcountchannelid: "your-bot-count-channel-id" // Channel ID of the channel
    },

    // Alt Prevention Settings
    alt_prevention: {
        enabled: false, // Toggle on or off

        removeAlts: false, // Toggle on or off the bot kicking alt accounts
        botsBypass: false, // Toggle on or off if bots should be affected

        dmUsers: false, // Toggle on or off if the bot should DM users about being removed for being alts
        dmMessage: "We detected your account as an alt.", // The message that the bot should DM them

        timelimit: "30d" // The account age limit before an account is considered an alt
    },

    // Ping Prevention Settings
    pingprev: {
        enabled: false, // Toggle on or off
        data: [ // The users for the ping prevention module
            {userid: "704094587836301392", embedcolor: "#0362fc", useMessage: false, message: "Please do not ping me, I have a life, just like you :]", useImage: false, imageURL: "https://hyperz.dev/images/nopinghyperzlol.png"}
        ]
    },

    // Auto React Settings
    autoreact: {
        enabled: false, // Toggle on or off
        cases: [ // The different channels and emojis to listen and react with
            {channelid: "monkey-channel-id-oohooh-ahhahh", emoji: "🐒"}
        ]
    },

    // Auto Respond Settings
    autorespond: {
        enabled: false, // Toggle on or off
        cases: [ // The content and message to respond with
            {content: "hi", respond: "Hello There!"}
        ]
    },

    // Leveling Module Settings
    leveling_config: {
        enabled: false, // Toggle on or off

        clearUsersOnLeave: false, // If a user leaves, should it clear their level.
        levelUpMultiplier: 300, // The mutlipler for levels

        moreXPForAttachments: false, // Should people who upload attachements get more XP
        attachmentsBonus: 1, // How much more XP

        moreXPForLongerMessages: false, // Should people who upload longer messages get more XP
        msgCharacterRequirement: 650, // How long of a message should it be
        longerMSGSBonus: 1 // How much more XP
    },

    // Reaction Roles Settings
    reactionroles: {
        enabled: false, // Toggle on or off
        reactions: [ // The Role ID To Give | The Message ID to the message | Workflow | The Reaction For That Role
            {roleid: "ROLE_ID_HERE", messageid: "MESSAGE_ID_HERE", workflow: 3, reactionname: "🍓"}
        ] // Workflow Options: 1 = Give Role | 2 = Take Role | 3 = Toggle Role (If has, remove, if not, give)
    },

    // Applications Settings
    applications: {
        enabled: false, // Toggle on or off
        categoryId: "YOUR_CATEGORY_ID", // Put the category ID for the apps here
        apps: [
            // Name for app             toggle on or off    name for cmd          channel to post answers to       questions lmao
            {name: "Staff Application", enabled: false, cmdname: "staff", loggingchannelid: "YOUR_LOGGING_CHANNEL_ID", questions: [
                    {number: "1", content: "How are you today?"},  // This is obivous
                    {number: "2", content: "What is your favorite color?"} // This is obivous
                ]
            },
            // Name for app             toggle on or off    name for cmd          channel to post answers to       questions lmao
            {name: "Bruh Application", enabled: false, cmdname: "bruh", loggingchannelid: "YOUR_LOGGING_CHANNEL_ID", questions: [
                    {number: "1", content: "How are you today?"}, // This is obivous
                    {number: "2", content: "What is your favorite color?"}, // This is obivous
                    {number: "3", content: "Do you like fortnite?"}, // This is obivous
                    {number: "4", content: "Bruh Moment?"}, // This is obivous
                    {number: "5", content: "Cringe lmfao like fr fr!"} // This is obivous
                ]  
            },
            // Name for app             toggle on or off    name for cmd          channel to post answers to       questions lmao
            {name: "Gamer Application", enabled: false, cmdname: "gamer", loggingchannelid: "YOUR_LOGGING_CHANNEL_ID", questions: [
                    {number: "1", content: "cake, now?"}, // This is obivous
                    {number: "2", content: "Hyperz is better than FAXES?"}, // This is obivous
                    {number: "3", content: "Hyperz is the best code for Snowside?"} // This is obivous
                ]
            }
            // THERE CAN BE MORE TOOOOOOOOOOOO!!!!!!!!!!!!!!!!!!!!!
        ]
    },

    // Ticket Module Settings
    tickets_module: {
        enabled: false, // Toggle on or off

        useTicketPanel: false, // Toggle on or off the ticket panel
        usersManageTickets: false, // Decides if a user can close / archive their own ticket

        useCategories: false, // Toggle on or off the use of categories
        categoryId: "YOUR_CATEGORY_ID_HERE", // The category ID

        archiveToTxtFile: false, // Toggles the archive command archiving tickets in TXT files
        archiveToHtmlFile: false, // Toggles the archive command archiving tickets in HTML files

        starterMessageTitle: "New Ticket", // The title for the starter messages
        starterMessage: "A support member should be with you shortly, we thank you for your patience at this time.", // The message for when a ticket is opened
        starterMessageEmbed: false, // If the starting message should be an embed

        panelButtonName: "🎟️ Open A Ticket", // The name for the button on the panel
        panelButtonStyle: "SECONDARY", // PRIMARY, SECONDARY, SUCCESS, or DANGER
        panelEmbedURL: "", // The thumbnail for the ticket panels
        ticketPanelColorHEX: "#16c98b", // The color of the ticket button panel
        ticketsCounted: false, // If the channel name should be the ticket # created

        maxtickets: 2, // The max amount of tickets a user can have open at 1 time (only works if ticketsCounted = false)
        pingRoleOnTicketOpen: false, // If the bot should ping a role when a ticket is opened
        roleIdToPing: "ROLE_ID_HERE" // The role for the bot to ping
    },

    // Giveaway Module Settings
    giveaways_module: {
        enabled: false, // Toggle on or off

        joinButton: "", // The text for the button
        joinButtonStyle: "", // The style for the button
        joinHeaderText: "", // The Header forthe button embed
        startGiveawayThumnailURL: "", // The thumbnail for the button embed

        endButton: "", // The text for the button
        endButtonStyle: "", // The style for the button
        endHeaderText: "", // The Header forthe button embed
        endGiveawayThumbnailURL: "", // The thumbnail for the button embed
        endGiveawayColor: "", // The color of the embed for when a giveaway ends

        rerollButton: "", // The text for the button
        rerollButtonStyle: "", // The style for the button
        rerollHeaderText: "", // The Header forthe button embed
        rerollGiveawayThumnailURL: "", // The thumbnail for the button embed
        rerollGiveawayColor: "" // The color of the embed for when a giveaway re-rolls
    },

    // Economy Module Settings
    economy_module: {
        shopCommand: false, // Toggle on or off
        inventoryCommand: false, // Toggle on or off

        workCommand: false, // Toggle on or off
        robCommand: false, // Toggle on or off
        crimeCommand: false, // Toggle on or off

        transferCommand: false, // Toggle on or off
        balanceCommand: false, // Toggle on or off

        depositCommand: false, // Toggle on or off
        withdrawCommand: false, // Toggle on or off

        itemCreate: false, // Toggle on or off
        itemDelete: false, // Toggle on or off

        buyItem: false, // Toggle on or off
        useItem: false, // Toggle on or off
        giveItem: false // Toggle on or off
    },

    // Custom Commands Settings
    customcommands_module: {
        enabled: false, // Toggle on or off
        cmds: [ // Name   Response   Embed Settings
            {name: "yes", response: "NO!", embed: {
                enabled: false, // Toggle on or off
                header: "", // Header for the embed if true | (can leave blank)
                colorhex: "", // Colorhex for the embed if true | (can leave blank)
                footer: "", // Footer for the embed if true | (can leave blank)
                thumbnail: false, // Thumnail Toggle for the embed if true
                thumbnailType: 1, // 1 = guild icon | 2 = message author icon | 3 = custom image link
                thumbnailLink: "", // Only fill this out if thumbnailType = 3
                imageLink: "" // Image Link for the embed if true | (can leave blank)
            }}, // Dont forget the commas!!!!!!!
            {name: "no", response: "YES!", embed: {
                enabled: false, // Toggle on or off
                header: "Embed Title", // Header for the embed if true | (can leave blank)
                colorhex: "#FFFFFF", // Colorhex for the embed if true | (can leave blank)
                footer: "This is cool", // Footer for the embed if true | (can leave blank)
                thumbnail: false, // Thumnail Toggle for the embed if true
                thumbnailType: 1, // 1 = guild icon | 2 = message author icon | 3 = custom image link
                thumbnailLink: "", // Only fill this out if thumbnailType = 3
                imageLink: "" // Image Link for the embed if true | (can leave blank)
            }}
        ]
    },

    // FiveM Integration Settings
    fivem_module: {
        enabled: false, // Toggle on or off

        playersCommand: false, // Toggle players command on or off

        refreshRate: "10m", // Set the server ping refresh rate for channel updates
        servers: [ // Channel ID to update       Name of channel      Server IP and PORT
            {server: 1, channelid: "884123193021964289", name: "Players", serverIPPort: "66.11.113.243:30120"},
            {server: 2, channelid: "884133617075359755", name: "LOLZ", serverIPPort: "170.39.213.207:30120"}
        ]
    },

    // Utility Settings
    utility_module: {
        mutedRoleId: "YOUR_MUTED_ROLE_ID", // The ID to your muted role goes here
        deleteSnipes: false, // Should snipes be deleted after they are fetched
        stickyMessages: false, // Toggles if stick messages should be enabled or not
        marriageSystem: false, // Toggles the marriage system on or off

        websiteUrl: "https://hyperz.dev/", // The URL to your website for the website command
        tosMessage: "Please **confirm** that you agree to our ToS\nBy typing \`I Agree\`.", // The message for the TOS command

        usePayPal: false, // Toggle on or off this payment method
        aPayPalLink: "https://hyperz.dev/", // Payment Method Link

        useCashApp: false, // Toggle on or off this payment method
        aCashAppLink: "https://hyperz.dev/", // Payment Method Link

        useVenmo: false, // Toggle on or off this payment method
        aVenmoLink: "https://hyperz.dev/", // Payment Method Link

        filterSystem: false, // Toggle the filter system on or off
        filteredWords: ['fuck'], // The words to be filtered

        birthdaySystem: false, // Toggle the birthday system on or off
        birthdayChannels: ["ID_HERE"], // The channel ids to log birthdays in
        birthdayHeaderText: "🥳 Happy Birthday!", // The header text for the birthday embed
        birthdayColorhex: "", // The color of the birthday embed
        birthdayRoleToPing: "", // The role to ping for birthdays, if empty, it won't ping any

        countingSystem: false, // Toggle on or off
        countingChannelId: "", // The channel ID for the counting to take place
        deleteCountingOnEnd: false, // Toggles if the messages should be deleted if someone ruins the count

        useSuggestions: false, // Toggle on or off suggestions
        suggestionsChannelIds: ["ID_HERE"], // The channel ids to post suggestions into
        suggestionSentMessage: "Your suggestion has been posted! Please wait while the community takes a vote on it!", // The message sent after the builder is complete

        useReviews: false, // Toggle on or off reviews
        reviewsChannelIds: ["ID_HERE"], // The channel ids to post reviews into
        reviewSentMessage: "Thanks for leaving a review! It has been revieved successfully!", // The message sent after the builder is complete

        useBugReports: false, // Toggle on or off bug reports
        bugReportsChannelIds: ["ID_HERE"], // The channel ids to post bug reports into
        bugReportSentMessage: "Thanks for leaving a review! It has been revieved successfully!", // The message sent after the builder is complete

        useSupportCommands: false, // Toggle on or off support notice commands
        supportMessageHeader: "Getting Support!", // This is the header of the support embed
        supportMessageThumbnail: false, // This toggles the thumbnail on the support embed.
        supportMemberMessage: "Hello,\nIf you're requesting support please **use a support channel**! No support is provided in this channel.", // The message sent to members
        supportCustomerMessage: "Hello,\nIf you're requesting support for a paid product please **use the customer channels**! No support will be provided here.", // The message sent to customers

        useClientCommands: false, // Toggle on or off client commands
        clientRoleId: "YOUR_CLIENT_ROLE_ID", // The role ID to give and remove from clients
        logNewClients: false, // Toggle on or off the logging of new clients
        newClientsLogChannelIds: ["ID_HERE"], // The channel ids to post new clients into

        useBlacklistSystem: false, // Toggle on or off client commands
        logBlacklistsChannels: ["ID_HERE"], // Channel Ids to log blacklists to
        blacklistEnforcement: false, // This decides if a user should be banned when they leave, and are blacklisted
        blacklistedRoleID: "YOUR_BLACKLISTED_ROLE_ID", // The role that a blacklisted user would recieve
        roleToGiveWhenUnBlacklisted: ['YOUR_MEMBER_ROLE_IDS'], // The roles that the user would get when they are unblacklisted
        addBlacklistImageURL: "https://images.emojiterra.com/twitter/512px/1f528.png", // The image when a user is blacklisted for the embed corner
        removeBlacklistImageURL: "https://www.pngkey.com/png/full/89-899418_broken-handcuffs-broken-handcuffs-transparent.png", // The image when a user is unblacklisted for the embed corner
        autoBanImageURL: "https://i.dlpng.com/static/png/5322872-thor-logo-free-logo-download-allogos-thor-logo-png-1000_1000_preview.png" // The image when a user is blacklisted and they leave for the embed corner
    },

    // Permission Settings
    // THESE ARE ALL ROLE IDS NOT USER IDS
    permissions_module: { // THESE ARE ALL ROLE IDS NOT USER IDS
        managers: ["ROLE_ID_HERE"], // People who can lock down server, use pay commands, client managers, and do giveaways
        moderation: ["ROLE_ID_HERE"], // People who can use moderation commands
        support: ["ROLE_ID_HERE"], // Access to support commands, and ticket system
        suggestions: ["ROLE_ID_HERE"], // Can send suggestions
        reviews: ["ROLE_ID_HERE"], // Can create reviews
        bugreports: ["ROLE_ID_HERE"], // Can create bug reports
        blacklists: ["ROLE_ID_HERE"], // Can manage blacklists
        stickymsgs: ["ROLE_ID_HERE"], // Can create and remove sticky messages
        infoAccess: ["ROLE_ID_HERE"], // Can use the information commands
        economyManagers: ["ROLE_ID_HERE"], // Can create items for the economy store
        bypassPingPrev: ["ROLE_ID_HERE"], // Can bypass Ping Prevention
        bypassFilterSystem: ["ROLE_ID_HERE"] // Can bypass Filter System
    },

    // Logging Settings
    logging_module: {
        deletedMessages: false, // Toggle on or off
        deletedMessagesChannels: ["ID_HERE"], // Channel IDs to send the logs to
        deletedMessagesColorhex: "", // The color for the logging embed

        editedMessages: false, // Toggle on or off
        editedMessagesChannels: ["ID_HERE"], // Channel IDs to send the logs to
        editedMessagesColorhex: "", // The color for the logging embed

        channelCreate: false, // Toggle on or off
        channelCreateChannels: ["ID_HERE"], // Channel IDs to send the logs to
        channelCreateColorhex: "", // The color for the logging embed

        channelUpdate: false, // Toggle on or off
        channelUpdateChannels: ["ID_HERE"], // Channel IDs to send the logs to
        channelUpdateColorhex: "", // The color for the logging embed

        channelDelete: false, // Toggle on or off
        channelDeleteChannels: ["ID_HERE"], // Channel IDs to send the logs to
        channelDeleteColorhex: "", // The color for the logging embed

        roleCreate: false, // Toggle on or off
        roleCreateChannels: ["ID_HERE"], // Channel IDs to send the logs to
        roleCreateColorhex: "", // The color for the logging embed

        roleUpdate: false, // Toggle on or off
        roleUpdateChannels: ["ID_HERE"], // Channel IDs to send the logs to
        roleUpdateColorhex: "", // The color for the logging embed

        roleDelete: false, // Toggle on or off
        roleDeleteChannels: ["ID_HERE"], // Channel IDs to send the logs to
        roleDeleteColorhex: "", // The color for the logging embed

        userUpdate: false, // Toggle on or off
        userUpdateChannels: ["ID_HERE"], // Channel IDs to send the logs to
        userUpdateColorhex: "", // The color for the logging embed

        commands: false, // Toggle on or off
        commandsChannels: ["ID_HERE"], // Channel IDs to send the logs to
        commandsColorhex: "", // The color for the logging embed

        // INVITE LOGGING IS CURRENTLY BROKEN, DISCORD FUCKED THEIR API
        invites: false, // Toggle on or off
        invitesChannels: ["ID_HERE"], // Channel IDs to send the logs to
        invitesColorhex: "", // The color for the logging embed

        altPrevention: false, // Toggle on or off
        altPreventionChannels: ["ID_HERE"], // Channel IDs to send the logs to
        altPreventionColorhex: "", // The color for the logging embed

        ticketTranscripts: false, // Toggle on or off
        ticketTranscriptsChannels: ["ID_HERE"], // Channel IDs to send the logs to
        ticketTranscriptsColorhex: "", // The color for the logging embed

        punishments: false, // Toggle on or off
        punishmentsChannels: ["ID_HERE"], // Channel IDs to send the logs to
        punishmentsColorhex: "", // The color for the logging embed

        privateMessages: false, // Toggle on or off
        privateMessagesChannels: ["ID_HERE"], // Channel IDs to send the logs to
        privateMessagesColorhex: "", // The color for the logging embed

        serverLock: false, // Toggle on or off
        serverLockChannels: ["ID_HERE"], // Channel IDs to send the logs to
        serverLockColorhex: "" // The color for the logging embed
    },

    /*
        This next section is recommended that you do not touch, unless you know what you're doing.
        This next section is recommended that you do not touch, unless you know what you're doing.
        This next section is recommended that you do not touch, unless you know what you're doing.
        This next section is recommended that you do not touch, unless you know what you're doing.
        This next section is recommended that you do not touch, unless you know what you're doing.
    */

    winkGifs: [
        "https://tenor.com/view/mr-bean-wink-wink-winking-rowan-atkinson-gif-15388297",
        "https://tenor.com/view/friends-joey-tribbiani-matt-le-blanc-wink-gif-15694137",
        "https://tenor.com/view/the-office-michael-scott-steve-carell-wink-gif-7720100",
        "https://tenor.com/view/wink-flirty-james-franco-gif-9644828",
        "https://tenor.com/view/wink-emoji-gif-10802837",
        "https://tenor.com/view/sexy-wink-rdj-robert-downey-jr-gif-15956626",
        "https://tenor.com/view/wink-katy-perry-flirty-gif-5060235",
        "https://tenor.com/view/jake-gyllenhaal-wink-smile-sexy-okay-gif-15428665",
        "https://tenor.com/view/donald-trump-wink-president-usa-gif-7576941",
        "https://tenor.com/view/dog-doge-dogo-blink-wink-gif-11385524",
        "https://tenor.com/view/flirt-wink-eyebrows-milhouse-the-simpsons-gif-5751664",
        "https://tenor.com/view/dean-supernatural-wink-jensen-ackles-point-gif-5104974"
    ],

    magic8BallResponses: [
        "It is Certain.", // yes
        "It is decidedly so.", // yes
        "Without a doubt.", // yes
        "Yes definitely.", // yes
        "As I see it, yes.", // yes
        "Yes.", // yes
        "Reply hazy, try again.", // unknown
        "Better not tell you now.", // unknown
        "Cannot predict now.", // unknown
        "Don't count on it.", // no
        "My reply is no.", // no
        "My sources say no.", // no
        "Outlook not so good.", // no
        "Very doubtful." // no
    ],

    // Can technically be anything
    econCurrency: "$",

    workEcon: [ // Set amount values to negative to take money await...
        { text: "You cleaned someones house and made ", amount: 138 },
        { text: "You worked at the car wash and made ", amount: 382 },
        { text: "You fried chicken on a grill for the neighbots and made ", amount: 18 },
        { text: "You cleaned the gas station toilets and made ", amount: 15 },
        { text: "You did a kids homework for him and made ", amount: 67 }
    ],

    crimeEcon: [ // Set amount values to negative to take money await...
        { text: "You beat up a woman in an alley and got ", amount: 10 },
        { text: "You did a drive-by on biggie cheese and made ", amount: 600 },
        { text: "You keyed a car and stole ", amount: 19 },
        { text: "You held up a bank and made ", amount: 500 },
        { text: "You pooped on the neighbors poarch and got ", amount: 1 }
    ],

    memeSubReddit: "meme",

    command_count: 92,
    event_count: 17

}

module.exports = _config;