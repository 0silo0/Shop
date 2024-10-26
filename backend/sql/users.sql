
create table users(
    user_id serial primary key,
    username varchar(20),
    password_hash varchar,
    email varchar(100),
    first_name varchar(255),
    last_name varchar(255),
    phone_number varchar(255),
    address varchar(50),
    city varchar(50),
    country varchar(50)
);