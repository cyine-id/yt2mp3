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
              "Host": "ytapivmp3.com",
              "X-Real-IP": "119.110.67.222",
              accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              // "accept-encoding": "gzip, deflate, br",
              "accept-language": "en-US,en;q=0.9",
              "cache-control": "no-cache",
              pragma: "no-cache",
              referer: "https://www.easy-youtube-mp3.com/",
              "sec-fetch-dest": "iframe",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "cross-site",
              "sec-gpc": 1,
              "upgrade-insecure-requests": 1,
              "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
            }
          }
        );
        const linkgRex = /<a.+?href=[\"'](.+?)[\"'].*?>/g;
        const url = [];
        let dt;
        while ((dt = linkgRex.exec(response.data))) {
            url.push(dt[1]);
        }
        if(url.length > 0){
          res.status(200).send({
            message: "Success",
            data: url
          });
        }else{
          res.status(404).send({
            message: "Not Found"
          });
        }
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
