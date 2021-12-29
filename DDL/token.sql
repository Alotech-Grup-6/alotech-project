create table token
(
    token_id   int auto_increment
        primary key,
    token      varchar(70) collate utf8_turkish_ci not null,
    created_at datetime                            not null,
    ttl        int                                 not null,
    url        int                                 null,
    ip         double                              null,
    user_id    int                                 null,
    constraint token_url_url_id_fk
        foreign key (url) references url (url_id)
            on update cascade on delete cascade,
    constraint token_user_user_id_fk
        foreign key (user_id) references user (user_id)
            on update cascade on delete cascade
)
    collate = utf8mb4_unicode_ci;

