const express = require('express');
const  router = express.Router();

let website;


router.get('/', (req, res) => {
  res.render('index', { title: "Scrap" });
});
router.post('/submit', (req, res) => {
  website = req.body
  res.render('toServer.ejs', {website})
  return website
})


module.exports = router