create
    definer = root@localhost procedure updateUser(IN _user_id int, IN _username varchar(50),
                                                          IN _user_name varchar(50), IN _user_surname varchar(50),
                                                          IN _user_email varchar(50), IN _user_type varchar(30))
BEGIN
UPDATE user
SET username = _username, user_name = _user_name, user_surname=_user_surname,user_email=_user_email,user_type=_user_type
WHERE user_id=_user_id;

END;

