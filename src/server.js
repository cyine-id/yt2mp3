require('dotenv').config()
const axios = require("axios");
const express = require('express')

const port = process.env.APP_PORT|| 5000;
const app = express()

const MainPage = async (req, res) => {
  try {
      if (req.query['id'] != "" || req.query['id'] != null){
        const response = await axios.get(
          `https://ytapivmp3.com/api/button/mp3/${req.query['id']}`,
          {
            headers: {
              referer: "https://www.easy-youtube-mp3.com/ "
            }
          }
        );
        const linkgRex = /<a.+?href=[\"'](.+?)[\"'].*?>/g;
        const url = [];
        let dt;
        while ((dt = linkgRex.exec(response.data))) {
            url.push(dt[1]);
        }
        res.status(200).send(url);
      }else{
        res.status(500).send({
            message: "Internal Server Error"
        });
      }
  } catch (error) {
    res.status(500).send({
        message: "Internal Server Error"
    });
  }
};

app.get('/', MainPage)
app.listen(port, ()=>{
    console.log("Running "+port);
})
