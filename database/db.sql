create database database_links;

use database_links;

create table users(
    id int(11) not null,
    username varchar(50) not null,
    password varchar(50) not null,
    fullname varchar(100) not null
);

alter table users add primary key (id);

alter table users modify id int(11) not null auto_increment, auto_increment = 2;

describe users;

create table links(
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users (id)
);

alter table links add primary key (id);

alter table links modify id int(11) not null auto_increment, auto_increment = 2;
