const express = require("express")
require('dotenv').config()
const app = express();
const port=process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello User-Manager')
  })




app.listen(port,()=>{
    console.log('server started',port)
})