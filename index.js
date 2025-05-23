const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { html } = require('cheerio/lib/api/manipulation');

const app = express();
const articles = [];


app.get('/',function(req, res){
    // also res.send("");
    res.json("You have hit the homepage URL");
  
})
app.get('/news',(req, res)=>{ //also a way to write the .get
    axios.get('https://www.bbc.com/')
    //since it's promised based(asynchronous programming)
    .then ((resp) => {
        const HTML = resp.data;
        //console.log(HTML);
        const $ = cheerio.load(HTML);

        $('a:contains("tech")',HTML).each(function(){
            const title = $(this).text(); // $(this) means  $('a:contains("tech")',html)
            const url = $(this).attr('href');

            //in the array articles we push an object with title and url
            articles.push({
                title,
                url
            })
            res.json(articles);
        })
    }).catch((err)=>(console.error(err)))
})

//call the router
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}, access with "http://localhost:${PORT}/"`));