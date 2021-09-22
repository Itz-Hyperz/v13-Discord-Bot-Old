CREATE TABLE users (
    userid varchar(255),
    warns INT,
    kicks INT,
    bans INT,
    mutes INT,
    joins INT,
    leaves INT,
    messages INT,
    delMessages INT,
    isMuted varchar(255),
    muteTime INT,
    isAfk varchar(255),
    balance INT,
    bank INT,
    workCooldown varchar(255),
    crimeCooldown varchar(255),
    robCooldown varchar(255)
);

CREATE TABLE stickymsgs (
    channel varchar(255),
    message TEXT,
    embed varchar(255),
    color TEXT
);

CREATE TABLE offlinebans (
    id varchar(255),
    reason text
);

CREATE TABLE chatlvl (
    userid text,
    userxp INT,
    userlvl INT
);

CREATE TABLE cases (
    userid varchar(255),
    reason text,
    uniqueid varchar(255),
    enforcerid varchar(255),
    type varchar(255)
);

CREATE TABLE stats (
    tickets INT,
    counted INT
);

INSERT INTO stats (tickets, counted) VALUES (0, 0);

CREATE TABLE ticketpanels (
    uniqueid varchar(255),
    messageid varchar(255),
    title TEXT,
    categoryid varchar(255),
    openmessage TEXT
);

CREATE TABLE marriage (
    userid varchar(255),
    spouse varchar(255)
);

CREATE TABLE clients (
    userid varchar(255),
    uniqueid INT
);

CREATE TABLE giveaways (
    prize TEXT,
    winners TEXT,
    timelimit TEXT,
    uniqueid INT,
    messageid varchar(255),
    channelid varchar(255),
    active varchar(255),
    starter varchar(255)
);

CREATE TABLE giveawayentrys (
    gid varchar(255),
    userid varchar(255)
);

CREATE TABLE birthdays (
    userid TEXT,
    deDate TEXT
);

CREATE TABLE shop (
    productId varchar(255),
    productName TEXT,
    productPrice INT
);

CREATE TABLE owneditems (
    productId INT,
    productName TEXT,
    userid varchar(255)
);