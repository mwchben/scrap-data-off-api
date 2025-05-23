## Scrap site data

## Use

#### 1. install

- Git clone the repo and run `npm i`
- Run `npm install -g nodemon`

#### 2. for getting JSON data from various one site

`npm run start`

GET Requests available

- run "http://localhost:${PORT}/" where PORT is defined line 1 of Code
- run "http://localhost:${PORT}/news" to get tech news

#### 3. for getting JSON data from various sites

`npm run start2`

GET Requests available

- run "http://localhost:${PORT}/" where PORT is defined line 1 of Code
- run "http://localhost:${PORT}/news" to get tech news from all sites
- run "http://localhost:${PORT}/news/:siteId" to get tech news from a specific site


#### note:

Replace sites array objects with your website

The following packages are used:

1. [Axios](https://www.npmjs.com/package/axios)
2. [Express](https://www.npmjs.com/package/express)
3. [Cheerio](https://www.npmjs.com/package/cheerio)

4. [Nodemon](https://www.npmjs.com/package/nodemon)

#### Reference: Ann Kubow
