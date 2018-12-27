'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

var people = [{ "username": "doctorwhocomposer", "forename": "Delia", "surname": "Derbyshire" }];
var numbers = [1, 2, 3];

router.get("/numbers", function (req, resp) {
    const n = req.query.number;
    console.log("communicated");
    resp.send("hello world " + n);
})

router.get("/people", function (req, resp) {
    console.log("all");
    resp.send(people);
})

router.post('/addnumber', function (req, resp) {

    const t = req.body.number;
    numbers.push(t);
    resp.send("number added " + t);
})

