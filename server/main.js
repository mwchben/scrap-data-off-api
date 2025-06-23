const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');

const dataLocation = path.join('data', 'userReq.json');
// const dataLocationTwo = path.join('data', 'articles.json');

const readUserReq = () => fs.readFileSync(dataLocation, { encoding: "utf-8" })
const getUserReq = JSON.parse(readUserReq())

console.log("Data available to use for scraping here in json:", getUserReq);


const app = express();
app.set('views','views')
app.set('view engine', 'ejs')
//above code for views added to serve errors.ejs

var articles = [];
const site = {
  name: getUserReq.name,
  address: getUserReq.address,
  baseURL: getUserReq.baseURL,
};

console.log("See this:.......", site.name);
// News scraping route
app.get("/", (req, res) => {
  axios
    .get(site.address)
    .then((resp) => {

      const HTML = resp.data;
      const $ = cheerio.load(HTML);
      articles.length = 0; //clear old articles


      $(`a:contains(${site.name})`, HTML).each(function () {
        const title = $(this).text(); // $(this) means  $('a:contains("tech")',html)
        const url = $(this).attr("href");
        console.log("Scraping started");
        //in the array articles we push an object with title and url
        articles.push({
          title,
          url: site.baseURL + url,
          source: site.name,
        });
      });
      console.log(articles);

      // Save articles to a file after modification
      fs.writeFile(
        "./data/articles.json",
        JSON.stringify(articles, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file", err);
          } else {
            console.log("Scraped data saved to articles.json");
          }
        }
      );

      res.json(articles);
    })
    // .catch((err) => console.error(err));
    .catch((err)=> {
      if (err.response.status===404) {
       res.status(404).render("errors", { message: "Page not found (404)" });
       return;
      } else {
        console.error(err)
        res.status(500).render('errors', { message: "An unexpected error occurred." });
      }
    });
});

app.listen(PORT, () =>
  console.log(`Server running: "http://localhost:${PORT}"`)
);
