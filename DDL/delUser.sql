CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser`(IN _user_id int)
BEGIN
DELETE FROM user WHERE user_id=_user_id;
END