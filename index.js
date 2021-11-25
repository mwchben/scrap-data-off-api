const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

app = express();

app.get('/',(req, res)=>{
    res.json("Climate Change News");
})
app.get('/news',(req, res)=>{
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    //since it's promised based(assynchronous programming)
    .then (resp =()=>{
        console.log("response",resp)
    })
})

//call the router
app.listen(PORT, (console.log(`Server running on port 8000 ${PORT}`)));