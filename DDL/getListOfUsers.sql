create
    definer = root@localhost procedure getListOfUsers()
BEGIN
SELECT user_id,username,user_name,user_surname,user_email,user_type FROM user;
END;

