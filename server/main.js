const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');

const dataLocation = path.join('data', 'userReq.json');

const readUserReq = () => fs.readFileSync(dataLocation, {encoding: "utf-8"})
const getUserReq = JSON.parse(readUserReq())

console.log("Data available to use for scraping here in json:",getUserReq);


const app = express();
var articles = [];
const site = {
  name: getUserReq.name,
  address: getUserReq.address,
  baseURL: getUserReq.baseURL,
};

// News scraping route
app.get("/", (req, res) => {
  axios
    .get(site.address)
    .then((resp) => {
      const HTML = resp.data;
      const $ = cheerio.load(HTML);
      articles.length = 0; //clear old articles

      $('a:contains(${site.name})', HTML).each(function () {
        const title = $(this).text(); // $(this) means  $('a:contains("tech")',html)
        const url = $(this).attr("href");

        //in the array articles we push an object with title and url
        articles.push({
          title,
          url: site.baseURL + url,
          source: site.name,
        });
      });

      // Save articles to a file after modification
      fs.writeFile(
        "./data/articles.json",
        JSON.stringify(articles, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file", err);
          } else {
            console.log("Articles saved to articles.json");
          }
        }
      );

      res.json(articles);
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () =>
  console.log(`Server running: "http://localhost:${PORT}"`)
);
