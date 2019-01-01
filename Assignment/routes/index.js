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
    var fname;
    var sname;

    if (person != undefined) {
        fname = person.forename;
        sname = person.surname;
    }
    else {
        fname = " This user does not exist";
        sname = "";
    }
    resp.send(fname + " " + sname);
})

router.get("/people", function (req, resp) {
    console.log(people);
    resp.send(people);
})

router.post('/addperson', function (req, resp) {
    console.log(req.body); //debugging 
    const uname = req.body.username;
    const fname = req.body.forename;
    const sname = req.body.surname;
    var person = { "username": uname, "forename": fname, "surname": sname };
    people.push(person);
    console.log(people);
    resp.send("person added " + person);
})