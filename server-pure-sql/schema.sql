CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id varchar(20),
  userID varchar(20),
  text varchar(250),
  roomID varchar (20)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  username varchar(30),
  userID varchar(20)
);

CREATE TABLE rooms (
  roomname varchar(30),
  roomID varchar(20)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

