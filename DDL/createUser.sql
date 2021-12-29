create
    definer = root@localhost procedure createUser(IN username varchar(50), IN user_name varchar(50),
                                                          IN user_surname varchar(50), IN user_password varchar(200),
                                                          IN user_email varchar(50), IN user_type varchar(20))
BEGIN
INSERT INTO user (username,user_name,user_surname,user_password,user_email,user_type)
VALUES (username,user_name,user_surname,user_password,user_email,user_type);
END;

