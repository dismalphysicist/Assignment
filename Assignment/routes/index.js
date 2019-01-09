'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

var people = [{
    "username": "doctorwhocomposer", "forename": "Delia", "surname": "Derbyshire", "DoB": "1937-05-05", "sex": "F", "disability": false }];

router.get("/people/:username", function (req, resp) {
    const u = req.query.username.trim();
    var person = people.find(x => x.username === u);
    var fname;
    var sname;

    if (person != undefined) {
        fname = person.forename;
        sname = person.surname;
        resp.send(person); //fname + " " + sname
    }
    else {
        resp.send(" This user does not exist");
    }
})

router.get("/people", function (req, resp) {
    console.log(people); //debugging 
    resp.send(people);
})

router.post('/addperson', function (req, resp) {
    //console.log(req.body); //debugging 
    const uname = req.body.username.trim();
    const fname = req.body.forename.trim();
    const sname = req.body.surname.trim();
    var person = { "username": uname, "forename": fname, "surname": sname,
        "DoB": req.body.dob, "sex": req.body.sex, "disability": req.body.disability };
    people.push(person);
    resp.send("Person added: " + fname + " " + sname);
})