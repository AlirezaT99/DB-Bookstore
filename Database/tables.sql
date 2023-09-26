CREATE EXTENSION pgcrypto;

CREATE TABLE publisher
(
    puName varchar(50) NOT NULL,
    balance int DEFAULT 0 CHECK (balance >= 0),
    phoneNumber numeric(10,0),
    email varchar(320),
    address text,
    PRIMARY    KEY (puName)
);

CREATE TABLE product
(
    prName VARCHAR(50) NOT NULL,
    puName VARCHAR(50) NOT NULL,
    discountValue NUMERIC(4,2),
    maxDiscount NUMERIC(4,2) DEFAULT 0.0,
    discountEXP DATE,
    topic VARCHAR(100),
    publishDate DATE,
    price INTEGER,
    explanation TEXT,
    sampleFileAddr TEXT,
    fileAddr TEXT,
    fileSize INTEGER,
    prLength INTEGER,
    prType VARCHAR(1) NOT NULL,
    CHECK (prType IN('T', 'A', 'M')) ,
    PRIMARY KEY (prName, puName),
    FOREIGN KEY (puName) REFERENCES publisher
);

CREATE TABLE productWriter
(
    prName VARCHAR(50) NOT NULL,
    puName VARCHAR(50) NOT NULL,
    wrName VARCHAR(50) NOT NULL,
    PRIMARY KEY (prName, puName, wrName),
    FOREIGN KEY (prName, puName) REFERENCES product
);

CREATE TABLE productTranslator
(
    puName VARCHAR(50) NOT NULL,
    prName VARCHAR(50) NOT NULL,
    trName VARCHAR(50) NOT NULL,
    PRIMARY KEY (prName, puName, trName),
    FOREIGN KEY (prName, puName) REFERENCES product
);

CREATE TABLE magazineTeller
(
    puName VARCHAR(50) NOT NULL,
    prName VARCHAR(50) NOT NULL,
    teName VARCHAR(50) NOT NULL,
    PRIMARY KEY (prName, puName, teName),
    FOREIGN KEY (prName, puName) REFERENCES product
);

CREATE TABLE channel
(
    channelPhoneNumber NUMERIC(10,0) NOT NULL,
    explanation TEXT,
    cName VARCHAR(50),
    email VARCHAR(320),
    PRIMARY KEY (channelPhoneNumber)
);

CREATE TABLE episode
(
    channelPhoneNumber NUMERIC(10,0) NOT NULL,
    eNumber integer NOT NUll,
    topic VARCHAR(50),
    explanation TEXT,
    eLength INTEGER,
    fileSize INTEGER,
    fileAddr TEXT,
    publishDate DATE,    
    check (eNumber > 0),
    PRIMARY KEY (channelPhoneNumber, eNumber),
    FOREIGN KEY (channelPhoneNumber) REFERENCES channel
);

CREATE TABLE episodeTeller
(
    channelPhoneNumber NUMERIC(10,0) NOT NULL,
    eNumber INTEGER NOT NULL,
    teName VARCHAR(50) NOT NULL,
    PRIMARY KEY (channelPhoneNumber, eNumber, teName),
    FOREIGN KEY (channelPhoneNumber, eNumber) REFERENCES episode
);

CREATE TABLE users
(
    userPhoneNumber NUMERIC(10,0) NOT NULL,
    email VARCHAR(320),
    uName VARCHAR(50),
    balance integer,
    password TEXT NOT NULL,
    CHECK (balance >= 0),
    PRIMARY KEY (userPhoneNumber)
);

CREATE TABLE subscribeChannel
(
    userPhoneNumber NUMERIC(10, 0) NOT NULL,
    channelPhoneNumber NUMERIC(10,0) NOT NULL,
    PRIMARY KEY (userPhoneNumber, channelPhoneNumber),
    FOREIGN KEY (userPhoneNumber) REFERENCES users,
    FOREIGN KEY (channelPhoneNumber) REFERENCES channel
);

CREATE TABLE episodeFeedback
(
    userPhoneNumber NUMERIC(10,0) NOT NULL,
    channelPhoneNumber NUMERIC(10,0) NOT NULL,
    eNumber INTEGER NOT NULL,
    commentText TEXT,
    rate Integer NOT NULL,
    CHECK (rate > 0 and rate <= 5),
    PRIMARY KEY (userPhoneNumber, channelPhoneNumber, eNumber),
    FOREIGN KEY (userPhoneNumber) REFERENCES users,
    FOREIGN KEY (channelPhoneNumber, eNumber) REFERENCES episode
);

CREATE TABLE productFeedback
(
    userPhoneNumber NUMERIC(10,0) NOT NULL,
    prName VARCHAR(50) NOT NULL,
    puName VARCHAR(50) NOT NULL,
    commentText TEXT,
    rate Integer NOT NULL,
    CHECK (rate > 0 and rate <= 5),
    PRIMARY KEY (userPhoneNumber, prName, puName),
    FOREIGN KEY (userPhoneNumber) REFERENCES users,
    FOREIGN KEY (prName, puName) REFERENCES product
);

CREATE TABLE userHasProduct
(
    userPhoneNumber NUMERIC(10,0) NOT NULL,
    prName VARCHAR(50) NOT NULL,
    puName VARCHAR(50) NOT NULL,
    studyPercentage FLOAT NOT NULL,
    CHECK (studyPercentage >= 0 and studyPercentage <= 100),
    PRIMARY KEY (userPhoneNumber, prName, puName),
    FOREIGN KEY (userPhoneNumber) REFERENCES users,
    FOREIGN KEY (prName, puName) REFERENCES product
);

CREATE TABLE discount
(
    code VARCHAR(20) NOT NULL,
    expDate DATE,
    percentage FLOAT NOT NULL,
    maxValue INTEGER,
    CHECK (percentage >= 0 and percentage <= 100),
    PRIMARY KEY (code)
);
