const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');

const dataLocation = path.join('data', 'userReq.json');

function readUserReq() {
  fs.readFile(dataLocation, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
  });
}

readUserReq()



const app = express();
var articles = [];
const site = {
  name: "bbc",
  address: "https://www.bbc.com/innovation/artificial-intelligence",
  baseURL: "https://www.bbc.com",
};

// News scraping route
app.get("/", (req, res) => {
  axios
    .get(site.address)
    .then((resp) => {
      const HTML = resp.data;
      const $ = cheerio.load(HTML);
      articles.length = 0; //clear old articles

      $('a:contains("AI")', HTML).each(function () {
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
