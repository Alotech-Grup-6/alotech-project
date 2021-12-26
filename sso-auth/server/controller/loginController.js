const dbconn = require("../dbconfig");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const redirectURL = req.query.redirectURL;
  const { username, user_password } = req.body;
  // console.log(req.socket)

  dbconn.query(
    `select * from user where username="${username}"`,
    async (err, resUser) => {
      if (resUser.length === 0) {
      const match = await bcrypt.compare(
        user_password,
        resUser[0].user_password
      );
      if (!match) {
        res.status(401).json({
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

exports.urls = (req, res) => {
  dbconn.query("select url from url", (err, urls) => {
    res.status(200).json({
      message: "All urls",
      urls,
    });
  });
};

exports.isAccessTokenValid = (req, res) => {
  const { url, token } = req.body;

  if (token === undefined) {
    res.status(200).json({
      message: "undefined token",
    });
  } else {
    dbconn.query(`select url_id from url where url='${url}'`, (err, db) => {
      
      const url_id = db[0].url_id;

      dbconn.query(
        `select * from token where token="${token}" and url="${url_id}"`,
        (err, db) => {
          if (db.length === 1) {
            const resToken = db[0];
            const dbToken = resToken.token;
            const { created_at, ttl, user_id } = resToken;
            const nowDate = new Date();
            const dateDiff = (nowDate - created_at) / 3600000;

            if (dateDiff > ttl) {
              dbconn.query(`DELETE FROM token WHERE token="${token}"`, () => {
                res.status(200).json({
                  message: "out time token",
                });
              });
            } else {
              res.status(200).json({
                message: "token Validated",
              });
            }
          } else {
            res.status(200).json({
              message: "invalid Token",
            });
          }
        }
      );
    });
  }
};
