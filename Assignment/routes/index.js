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

router.get("/people/:username", function (req, resp) {
    const u = req.query.username;
    var person = people.find(x => x.username === u);
    var fname = person.forename;
    var sname = person.surname;
    resp.send(fname + " " + sname);
})

router.get("/people", function (req, resp) {
    console.log(people);
    resp.send(people);
})

router.post('/addnumber', function (req, resp) {

    const t = req.body.number;
    numbers.push(t);
    resp.send("number added " + t);
})

