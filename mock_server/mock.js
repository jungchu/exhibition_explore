let http = require('http');
let url = require('url');

let host = '127.0.0.1';
let port = 12345;

const cors = require("cors");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

const dish_data = require('./dish_data.json')

app.use('/api/dish/?*', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    res.send(dish_data);
});



app.listen(port,(err) => {
    if (err) {
        return console.log('bad');
    }
});