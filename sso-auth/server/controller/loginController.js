const dbconn = require("../dbconfig");
const { v4: uuidv4 } = require("uuid");

exports.login = async (req, res) => {
  const redirectURL = req.query.redirectURL;
  const { user_name, user_password } = req.body;

  dbconn.query(
    `select * from user where username="${user_name}" and user_password="${user_password}"`,
     (err, resUser) => {
      if (resUser.length === 0) {
        res.status(200).json({
          status: "Failed",
          message: "Wrong password or username",
        });
      } else {
        dbconn.query(
          `select url_id from url where url="${redirectURL}"`,
          (err, url) => {
            const url_id = url[0].url_id;
            const user_id = resUser[0].user_id;
            dbconn.query(`select * from token where user_id="${user_id}"`,(err,db)=>{
             
              if (db.length === 0){
                console.log("db sıfır ")
            const token = uuidv4();
            const m = new Date();
            const dateString =
              m.getUTCFullYear() +
              "-" +
              (m.getUTCMonth() + 1) +
              "-" +
              m.getUTCDate();
           
            dbconn.query(`  
         INSERT INTO token (token,created_at ,ttl,url,ip,user_id)
         VALUES ('${token}','${dateString}',${50},${url_id},'${128}',${user_id})`);
         res.status(200).json({
          message: "test",
          token: token
        });
            }else{
              
              console.log("db sıfır değil ")
              let ttl=db[0].ttl 
              let token_id=db[0].token_id
              ttl<50 ? ttl=50 : ttl=ttl
              dbconn.query(`UPDATE token SET ttl ="${ttl}" WHERE token_id = "${token_id}"`)
              dbconn.query(`select * from token where token_id="${token_id}"`,(err,token)=>{
                res.status(200).json({
                  message: "test",
                  token: token[0].token
                });
              })
              
            }
          }
        );})
      }
    }
  );
};
