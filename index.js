const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

app = express();

app.get('/',(req, res)=>{
    res.json("Climate Change News");
})

//call the router
app.listen(PORT, (console.log(`Server running on port 8000 ${PORT}`)));