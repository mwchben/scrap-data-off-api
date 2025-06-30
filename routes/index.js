const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

//get json data from ./data/articles in /get route
const articles = require('../data/articles.json');

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/data', (req, res) => {
  res.render('data', { articles });
});
router.get('/download', (req, res) => {
  const filePath = path.join(__dirname, '../data/articles.json');
  res.download(filePath, 'articles.json', (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).send("File not found");
    }
  });
})
router.post('/submit', (req, res) => {
  const requestData = req.body;
  let seeInBrowser = JSON.stringify(requestData)
  res.render('toServer.ejs', {
    seeInBrowser: {
      keyword: requestData.name,
      address: requestData.address,
      baseURL: requestData.baseURL
    }
  })
  fs.writeFile(
    "./data/userReq.json",
    seeInBrowser,
    (err) => {
      if (err) {
        console.error("Error writing file", err);
      } else {
        console.log("User Req saved to userReq.json");
      }
    }
  );
})


module.exports = router