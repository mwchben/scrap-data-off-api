const express = require('express');
const  router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: "Scrap" });
});
router.post('/submit', (req, res) => {
  const {website} = req.body
  res.render('toServer.ejs', {website})
})

module.exports = router