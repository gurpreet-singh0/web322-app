
/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Gurpeet Singh
Student ID: 166395210
Date: 2 June 2023  
Cyclic Web App URL:  https://troubled-ox-snaps.cyclic.app
GitHub Repository URL: https://github.com/gurpreet-singh0/web322-app.git

********************************************************************************/ 


const HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const path = require("path");

const storeService = require("./store-service.js");
var app = express();


app.use(express.static(__dirname + '/public'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var engines = require('consolidate')
app.engine('html', require('ejs').renderFile);
 

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
  }
  
// setup a 'route' to listen on the default url path
app.get('/', function (req, res) {
  res.redirect('/about');
});

app.get('/about', function (req, res) {
  res.render("about.html")
});

app.get("/shop", (req, res) => {
storeService.getPublishedItems()
    .then((items) => res.json(items))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

app.get("/categories", (req, res) => {
  storeService.getCategories()
      .then((categories) => res.json(categories))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  app.get("/items", (req, res) => {
    storeService.getItems()
        .then((items) => res.json(items))
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    });
    

app.get("*", (req, res) => {
  res
    .status(404)
    .json({ status: "error", message: "Page Not Found" });
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);