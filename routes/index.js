const express = require('express');
const  router = express.Router();
const fs = require('fs')

let website;


router.get('/', (req, res) => {
  res.render('index', { title: "Scrap" });
});
router.post('/submit', (req, res) => {
  website = req.body
  const userReq = {
    website
  }
  fs.writeFile(
          "./data/userReq.json",
          JSON.stringify(userReq),
          (err) => {
            if (err) {
              console.error("Error writing file", err);
            } else {
              console.log("User Req saved to userReq.json");
            }
          }
        );
  res.render('toServer.ejs', {website})
  return website
})


module.exports = router