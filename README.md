# Scrap site data

## How to go about

### 1. install

- Git clone the repo and run `npm i`
- Run `npm install -g nodemon`

### 2. for running frontend

`npm run start-f`

- Go to the base URL http://localhost/ with `:PORT` where PORT is defined on line 1 of code
- You will get:
    - keyword (main wording of what to look for in the `<a>` tags)
    - website (main URL of the site with pages/articles)
    - baseURL (main URL of the site)

### 3. for running backend

`npm run start-b`

Go to the base URL http://localhost/ with `:PORT` where PORT is defined on line 1 of Code


#### note:

Run the two servers concurrently
The following packages are used:

1. [Axios](https://www.npmjs.com/package/axios)
2. [Express](https://www.npmjs.com/package/express)
3. [Cheerio](https://www.npmjs.com/package/cheerio)
4. [Nodemon](https://www.npmjs.com/package/nodemon)
4. [EJS](https://ejs.co/)


#### Credits: Ann Kubow
