const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { html } = require('cheerio/lib/api/manipulation');


app = express();

app.get('/',(req, res)=>{
    res.json("Climate Change News");
})
app.get('/news',(req, res)=>{
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    //since it's promised based(asynchronous programming)
    .then ((resp) => {
        const HTML = resp.data;
        console.log(HTML);
        const $ = cheerio.load(HTML);

        $('a:contains("climate")',html).each(function(){
            const title = $(this).text(); // $(this) means  $('a:contains("climate")',html)
            const URL = $(this).attr('href');
        })
    })
})

//call the router
app.listen(PORT, (console.log(`Server running on port ${PORT}`)));