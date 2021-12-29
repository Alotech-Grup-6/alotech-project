create table user
(
    user_id       int auto_increment
        primary key,
    username      varchar(18)  not null,
    user_name     varchar(15)  not null,
    user_surname  varchar(15)  not null,
    user_password varchar(200) not null,
    user_email    varchar(30)  not null,
    user_type     varchar(10)  not null,
    constraint user_email_UNIQUE
        unique (user_email),
    constraint username_UNIQUE
        unique (username)
)

    collate = utf8_turkish_ci;

insert into user (user_id, username, user_name,user_surname,user_password,user_email,user_type)
values
       (1, 'admin', 'admin','admin','$2b$10$kvM.iE/anKbdg4Tdy5RHdOW2m8ovg0Zw34EburBfNxnaHZ4y9/kba','admin@admin.com','admin'),
        (2, 'user', 'user','user','$2b$10$hm.A6EKZ13NLke01tFXAS.H/0/klMREMHM8SZdnB250Sxt4wkLw6C','user@user.com','user'),
        (3, 'test', 'test','test','$2b$10$hm.A6EKZ13NLke01tFXAS.H/0/klMREMHM8SZdnB250Sxt4wkLw6C','test@test.com','user')

