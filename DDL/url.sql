create table url
(
    url_id int auto_increment
        primary key,
    url    varchar(30) null,
    constraint Url_url_id_uindex
        unique (url_id),
    constraint Url_url_uindex
        unique (url)
)
    collate = utf8_turkish_ci;

insert into url (url_id,url)
values
(1,'http://localhost:3020'),
(2,'http://localhost:3110')