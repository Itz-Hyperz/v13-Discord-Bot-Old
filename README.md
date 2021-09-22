# YOU CANNOT REMOVE ANY CREDITS!!!!
# YOU CANNOT REMOVE ANY CREDITS!!!!
# YOU CANNOT REMOVE ANY CREDITS!!!!
# YOU CANNOT REMOVE ANY CREDITS!!!!
# YOU CANNOT REMOVE ANY CREDITS!!!!

# Notes

- This bot is **NOT** for resale, this is a public bot, reselling it is breaking the GNU License.
- If using code, or snippets, **YOU MUST CREDIT** `Hyperz#0001` in your bot / project.

---

# Dependencies:

`NOTE: I will only provide support to customers with a VPS / DPS.`

- [Bot Hosting](https://snowsidehosting.com/index.php?rp=/store/discord-bot-hosting) or a [VPS / DPS](https://snowsidehosting.com/index.php?rp=/store/vps)
- MySQL (Required)
- [NodeJS V16+](https://nodejs.org/en/) (Required to run the bot)
- [git](https://git-scm.com/downloads) (Required to run the bot)

---

# Install Guide

- Make sure you have downloaded [NodeJS](https://nodejs.org/en/) (get recommended)
- Open the bots folder
- Edit the `config.js` file to match your information
- Create a new database and import the `install.sql` file into a new database.
# Run With .bat
- Run the `CLIENT.bat` file
- Pick what you want to do
# Run With .c
- Compile `CLIENT.c`
- Run the compiled file and pick what you want to do

---

# MySQL

**The bots way of storing data!**

### This includes:
- punishments
- users stats
- sticky messages
- offline bans
- level system data
- birthdays
- giveaways & entrys
- marriages

### Default Code:

```
    "mysql": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "hypebot"
    },
```

- `host` - *The IP of the server hosting the DB*
- `user` - *The user you wish to use on the DB (usually root)*
- `password` - *The password to the user account*
- `database` - *The name of the database you are storing your tables in*

---

# Errors or Problems

Here you can find all of the possible / known errors or problems with that you may come across!

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Disallowed Intents](#disallowed-intents)
- [Node Modules Creation](#node-modules-creation-failed)
- [Missing Permissions](#missing-permissions)
- [ECON Refused](#econ-refused)
- [Discord-Canvas](#discord-canvas-issue)
- [Unexpected Token '?'](#unexpected-token-%3F)
- [Abort Controller](#abort-controller)

---

## DISALLOWED INTENTS

- Go to your [Discord Developer Portal](https://discord.com/developers/applications)

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk92MrQ-42jAGM8cJG%2Fimage.png?alt=media&token=2398ef14-a152-41d5-b173-d8707257d956)

- Click on your bot application

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9FEEHgKV5s3tMWlp%2Fimage.png?alt=media&token=9b14627b-99e4-4182-8238-50d6cc841166)

- Click the category on the side labeled "bot"

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9WrgdZ96Qc_qDz0r%2Fimage.png?alt=media&token=9561e70f-e498-4158-8cd8-4972af76a834)

- Scroll down until you find this section:

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9d4iK2e1uMMCIInb%2Fimage.png?alt=media&token=6a0f6649-2392-464b-98a0-4a9461348ab7)

- Turn "Presence Intent" to `ON`

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9tG7YwsotD-9uyZ2%2Fimage.png?alt=media&token=205c9408-0f8f-4833-8968-d782bbee17a8)

- Turn "Server Members Intent" to `ON`

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWk9wELj5EFdshgx2bI%2Fimage.png?alt=media&token=2635ecb2-c0ae-4c98-9779-0782f9754db6)

- Once you have turned both of those on, simply click **"SAVE CHANGES"** at the bottom

![](https://gblobscdn.gitbook.com/assets%2F-MLmR1WkAlmwgKseriew%2F-MWk8aiVPIdyBYNxUPT4%2F-MWkAMZnHS-yRu4JDQQR%2Fimage.png?alt=media&token=3e05fe9a-0fbd-47f7-9959-bb27cb7d73af)

- Then you are finished!!!!!
- Restart your bot, and then give it a shot!

---

## Node Modules Creation Failed

If this error occurs, it likely means you either 
- A), You don't have [NodeJS](https://nodejs.org/en/) V16+ installed.
- B), You don't have [Git](https://git-scm.com/downloads) installed.

Installing these should fix this issue!

---

## Missing Permissions

Make sure your bot has Administrator permissions in it's roles, also make sure it is at the top of the roles list, see example below if you need a visual example.

---

## ECON Refused

You have to actually connect to a MySQL server.

---

## Discord Canvas Issue

It looks like a bunch of `Node GYP` Errors, and it is usually spammed in the console.

To fix this issue, follow the below guide.

- Delete the `node_modules` folder inside of the bot.
- Make sure you have updated to [NodeJS V16+](https://nodejs.org/en/).
- Re-run the `CLIENT INSTALL.bat` file.
- Then try starting your bot with the provided client starter file.

---

## Unexpected Token ?

This error occurs when you're not on the latest required version of [NodeJS](https://nodejs.org) (v16+ Required)

---

## Abort Controller

To fix this issue, or issues / errors relating to this, simply [update NodeJS to V16+](https://nodejs.org)

You can check your NodeJS Version by running `node -v` in command prompt, powershell, or terminal.

---

# Getting IDs

- Open your Discord settings
- Scroll down and find "Appearance"
- Scroll to the bottom and find "Developer Mode"
- Turn the switch on
