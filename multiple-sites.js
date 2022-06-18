const PORT = 8001;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const articles = [];
const specificArticles = [];
const sites = [
    {
        name: "guardian",
        address: "https://www.theguardian.com/environment/climate-crisis",
        baseURL: ""
    },
    {
        name: "un",
        address: "https://www.un.org/en/global-issues/climate-change",
        baseURL: ""
    },
    {
        name: "who",
        address: "https://www.who.int/health-topics/climate-change",
        baseURL: ""
    },
    {
        name: "times",
        address: "https://www.thetimes.co.uk/environment/climate-change",
        baseURL: "" //append url if link is broken eg "".../climate-change/" to "/sth sth"  
    }
];

sites.forEach(site => {
    axios.get(site.address)
    //since it's promised based(asynchronous programming)
    .then ((resp) => {
        const HTML = resp.data;
        //console.log(HTML);
        const $ = cheerio.load(HTML);

        $('a:contains("climate")',HTML).each(function(){
            const title = $(this).text(); // $(this) means  $('a:contains("climate")',html)
            const url = $(this).attr('href');

            //in the array articles we push an object with title and url
            articles.push({
                title,
                url: site.baseURL + url,
                source: site.name
            })
            
        })
    })
    .catch((err)=> {
        (console.error(err))
    })
})


app.get('/',function(req, res){
    // also res.send("Climate Change News");
    res.json("Climate Change News");
  
})
app.get('/news',(req, res)=>{ //also a way to write the .get
    res.json(articles);
})

app.get('/news/:siteId', async(req, res)=>{ //also a way to write the .get
    const siteIdParam = req.params.siteId;

    const siteIdAddress = sites.filter(site => site.name == siteIdParam )[0].address;
    const siteIdBaseURL = sites.filter(site => site.name == siteIdParam )[0].baseURL;

    console.log(siteIdAddress);
    axios.get(siteIdAddress)
        .then(resp => {
            const HTML = resp.data
            const $ = cheerio.load(HTML);
            
            $("a:contains('climate')",HTML).each(function() {
                const title = $(this).text();
                const url = $(this).attr('href');

                specificArticles.push({
                    title,
                    url: siteIdBaseURL + url,
                    source: siteIdParam
                })
            })


            res.json(specificArticles)
        })
        .catch((err) => console.log(err))
})

//call the router
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));