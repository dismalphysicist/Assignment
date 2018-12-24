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

app.get("/numbers", function (req, resp) {
    const n = req.query.number;
    console.log("communicated");
    resp.send("hello world " + n);
})

app.get("/allnumbers", function (req, resp) {
    resp.send("All numbers: " + numbers);
})

app.post('/addnumber', function (req, resp) {

    const t = req.body.number;
    numbers.push(t);
    resp.send("number added " + t);
})

app.listen(8090);