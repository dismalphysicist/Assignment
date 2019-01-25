'use strict';
var express = require('express');
var router = express();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

var people = [{
    "username": "doctorwhocomposer", "forename": "Delia", "surname": "Derbyshire", "DoB": "1937-05-05", "sex": "F", "disability": false }];

//entrants is a list of people, who must be elements of the 'people' list
var events = [ { "name": "Pen y Fan", "date": "09-07-19", "entrants": [people[0]] },
    { "name": "Fan y Big", "date": "10-07-19", "entrants": [] } ];

router.get("/people/:username", function (req, resp) {
    const u = req.query.username;
    var person = people.find(x => x.username === u);

    if (person != undefined) {
        resp.send(person.forename + " " + person.surname); 
    }
    else {
        resp.send(" This user does not exist");
    }
})

router.get("/people", function (req, resp) {
    resp.send(people);
})

router.post('/addperson', function (req, resp) {
    var person = people.find(x => x.username === req.body.username);

    if (person == undefined) {
        const uname = req.body.username.trim();
        const fname = req.body.forename.trim();
        const sname = req.body.surname.trim();
        var person = {
            "username": uname, "forename": fname, "surname": sname,
            "DoB": req.body.dob, "sex": req.body.sex, "disability": req.body.disability
        };
        people.push(person);
        resp.send("Person added: " + fname + " " + sname);
    }
    else {
        resp.send("That username is taken.");
    }
})

router.get("/events/:eventname", function (req, resp) {
    const n = req.query.name;
    var event = events.find(x => x.name === n);

    if (event != undefined) {
        resp.send(event.name + ": " + event.date);
    }
    else {
        resp.send("This event does not exist");
    }
})

router.get("/events", function (req, resp) {
    console.log(events); //debugging 
    resp.send(events);
})

router.post("/addtoevent", function (req, resp) {
    var u = req.body.username;
    var id = req.body.eventID;
    var person = people.find(x => x.username === u);
    var event = events[id];

    //checking
    var p = event.entrants.find(x => x.username === u);
    if (p == undefined) {
        event.entrants.push(person);
        console.log(event.entrants); //debugging 
        resp.send("User " + u + " added to event " + event.name);
    }
    else {
        resp.send("That person is already registered.");
    }
})