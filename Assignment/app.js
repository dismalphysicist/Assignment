'use strict';
const express = require('express');
const app = express();
// ... add routes
module.exports = app;

app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))


/* GET home page. */
app.get('/', function (req, res) {
    res.sendfile("index.html");
});

var people = [{
    "username": "doctorwhocomposer", "forename": "Delia", "surname": "Derbyshire", "DoB": "1937-05-05", "sex": "F", "disability": false
}];

//entrants is a list of people, who must be elements of the 'people' list
var events = [{ "name": "Pen y Fan", "date": "09-07-19", "entrants": [people[0]] },
    { "name": "Fan y Big", "date": "10-07-19", "entrants": [] }];


app.get("/people/:username", function (req, resp) {
    var u = req.params.username;
    var person = people.find(x => x.username === u);

    resp.send(person); 
})

app.get("/people", function (req, resp) {
    resp.send(people);
})

app.post('/people', function (req, resp) {
  
    var person = people.find(x => x.username === req.body.username);

    if (person == undefined) {
        const uname = req.body.username;
        const fname = req.body.forename;
        const sname = req.body.surname;
        var person = {
            "username": uname, "forename": fname, "surname": sname,
            "DoB": req.body.dob, "sex": req.body.sex, "disability": req.body.disability
        };
        people.push(person);
        resp.send("Person added: " + fname + " " + sname);
    }
    else {
        resp.status(400); //error code 
        resp.send("That username is taken.");
    }
})

app.get("/events/:eventname", function (req, resp) {
    const n = req.query.name;
    var event = events.find(x => x.name === n);

    if (event != undefined) {
        resp.send(event.name + ": " + event.date);
    }
    else {
        resp.send("This event does not exist");
    }
})

app.get("/events", function (req, resp) {
    //console.log(events); //debugging 
    resp.send(events);
})

app.post("/addtoevent", function (req, resp) {
    var u = req.body.username;
    var id = req.body.eventID;
    var person = people.find(x => x.username === u);
    var event = events[id];

    //checking
    var p = event.entrants.find(x => x.username === u);
    if (p == undefined) {
        event.entrants.push(person);
        //console.log(event.entrants); //debugging 
        resp.send("User " + u + " added to event " + event.name);
    }
    else {
        resp.send("That person is already registered.");
    }
})
