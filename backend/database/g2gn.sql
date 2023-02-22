CREATE DATABASE g2gn;
USE g2gn;

CREATE TABLE users (
    id int auto_increment primary key,
    user_id varchar(50) not null,
    email varchar(50) not null,
    username varchar(50),
    role varchar(30) not null,
    created varchar(100)
);

CREATE TABLE admins (
    id int auto_increment primary key,
    username varchar(30),
    email varchar(50) not null unique,
    email_verified_at timestamp,
    password varchar(50) not null,
    activated int default 0,
    g2f_enabled int default 0,
    g2f_key varchar(200),
    kyc_verified int default 0,
    access_token varchar(1000),
    confirmation_code varchar(200),
    role int default 1,
    remember_token varchar(200)
);

CREATE TABLE reset_password (
    id int auto_increment primary key,
    admin_id int,
    confirmation_link varchar(200),
    expiration_time varchar(20)
);

