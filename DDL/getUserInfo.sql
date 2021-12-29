create
    definer = root@localhost procedure getUserInfo(IN _user_id int)
BEGIN
select *  from user where user_id=_user_id;
END;

