const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs"); // Add this at the top

const app = express();
var articles = [];

// News scraping route
app.get("/", (req, res) => {
  axios
    .get("https://www.bbc.com")
    .then((resp) => {
      const HTML = resp.data;
      const $ = cheerio.load(HTML);
      articles.length = 0; //clear old articles

      $('a:contains("tech")', HTML).each(function () {
        const title = $(this).text(); // $(this) means  $('a:contains("tech")',html)
        const url = $(this).attr("href");

        //in the array articles we push an object with title and url
        articles.push({
          title,
          url,
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
