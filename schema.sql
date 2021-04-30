-- drop database if exists 
DROP DATABASE IF EXISTS play;
-- create database
CREATE DATABASE IF NOT EXISTS play CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci; USE play;

-- create table user
CREATE TABLE 'user'( 'name' varchar(25) NOT NULL,'phone_no' varchar(10) NOT NULL,'age' int NOT NULL,'mailid' varchar(20) NOT NULL PRIMARY KEY,'password' varchar(20) NOT NULL,'address' varchar(50),'bookings' varchar(225));


-- create table for court managers
CREATE TABLE courtm(courtname varchar(20) NOT NULL,address varchar(50) NOT NULL,types varchar(225),mailid varchar(20) NOT NULL PRIMARY KEY,password varchar (20) NOT NULL,cid varchar(225));


-- create table courts
CREATE TABLE courts(courtid int not null primary key,mailid varchar(20),type varchar(16),address varchar(50),phonenumber varchar(10));



-- create table user signup
INSERT INTO user VALUES (name,phone_no,age,password,address,bookings,mailid) ;




-- create table for maintaining slots for the courts
Create Table " + req.body.name + req.body.id + " (date int not null,10AM_11AM BIT DEFAULT 0,11AM_12PM BIT DEFAULT 0,12PM_1PM BIT DEFAULT 0,2PM_3PM BIT DEFAULT 0,3PM_4PM BIT DEFAULT 0,4PM_5PM BIT DEFAULT 0);




-- upgrade and add mailid
update courtm set types='${req.body.name + req.body.id}' where mailid='${req.body.email}';




-- Adding courts 
insert into courts VALUES(courtid,mailid,type,address,phonenumber) ;


-- user login
SELECT password FROM user WHERE mailid='" + req.body.id + "'";


-- court manager login 
SELECT password FROM courtm WHERE mailid='" + req.body.id ;


-- Extract data to show up in courts 
SELECT * FROM courts

-- extract data using filters

SELECT * FROM courts WHERE type='" + req.body.type + "';



-- Getting the data of slots 
select * from ${req.body.id} where date=${req.body.date}



-- booking query 
select * from courts where mailid='${req.body.id}';




--  booking the slot and getting paid 
update ${req.body.id} set ${req.body.slot}=1 where date =${req.body.date};
-- Update any value in any tables 
update ${req.body.tname} set ${req.body.field}='${req.body.value}' where ${req.body.idd} ='${req.body.id};

