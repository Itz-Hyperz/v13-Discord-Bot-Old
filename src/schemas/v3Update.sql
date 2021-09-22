-- ONLY RUN THIS FILE IF YOU ARE UPDATING FROM HYPEBOTV3
-- ONLY RUN THIS FILE IF YOU ARE UPDATING FROM HYPEBOTV3
-- ONLY RUN THIS FILE IF YOU ARE UPDATING FROM HYPEBOTV3
-- ONLY RUN THIS FILE IF YOU ARE UPDATING FROM HYPEBOTV3
-- ONLY RUN THIS FILE IF YOU ARE UPDATING FROM HYPEBOTV3

CREATE TABLE clients (
    userid varchar(255),
    uniqueid INT
);

CREATE TABLE stats (
    tickets INT,
    counted INT
);

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

CREATE TABLE shop (
    productId INT,
    productName TEXT,
    productPrice INT
);

CREATE TABLE owneditems (
    productId INT,
    productName TEXT,
    userid varchar(255)
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

INSERT INTO stats (tickets, counted) VALUES (0, 0);

ALTER TABLE users
ADD joins INT;

ALTER TABLE users
ADD leaves INT;

ALTER TABLE users
ADD messages INT;

ALTER TABLE users
ADD delMessages INT;

ALTER TABLE users
ADD isAfk varchar(255);

ALTER TABLE users
ADD balance INT;

ALTER TABLE users
ADD bank INT;

ALTER TABLE users
ADD workCooldown varchar(255);

ALTER TABLE users
ADD crimeCooldown varchar(255);

ALTER TABLE users
ADD robCooldown varchar(255);

UPDATE users SET joins=1;
UPDATE users SET leaves=0;
UPDATE users SET messages=0;
UPDATE users SET delMessages=0;

UPDATE users SET balance=0;
UPDATE users SET bank=0;
UPDATE users SET workCooldown='false';
UPDATE users SET crimeCooldown='false';
UPDATE users SET robCooldown='false';

ALTER TABLE stickymsgs
ADD embed varchar(255);

ALTER TABLE stickymsgs
ADD color TEXT;

ALTER TABLE stickymsgs RENAME COLUMN channelid TO channel;
ALTER TABLE stickymsgs RENAME COLUMN msg TO message;

ALTER TABLE stickymsgs
DROP COLUMN enforcerid;
