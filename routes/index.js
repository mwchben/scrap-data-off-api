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
    website : this.name
  }
  let seeInBrowser = JSON.stringify(website.website)
  res.render('toServer.ejs', {seeInBrowser})
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
  return website
})


module.exports = router