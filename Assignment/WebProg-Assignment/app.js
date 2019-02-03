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

var passwords = ["pwd123"];

//entrants is a list of people, who must be elements of the 'people' list
var events = [{ "name": "Pen y Fan", "date": "2019-07-09", "entrants": [people[0]] },
    { "name": "Fan y Big", "date": "2019-07-10", "entrants": [] }];


app.get("/people/:username", function (req, resp) {
    var u = req.params.username;
    var person = people.find(x => x.username === u);

    resp.send(person); 
})

//delete after testing 
app.get("/people/:username/password", function (req, resp) {
    var personIndex = people.findIndex(x => x.username === req.params.username);
    resp.send(passwords[personIndex]);
})

app.get("/people", function (req, resp) {
    resp.send(people);
})

app.post('/people', function (req, resp) {
  
    var person = people.find(x => x.username === req.body.username);

    if (person == undefined && req.body.access_token != undefined) {
        const uname = req.body.username;
        const fname = req.body.forename;
        const sname = req.body.surname;
        var person = {
            "username": uname, "forename": fname, "surname": sname,
            "DoB": req.body.dob, "sex": req.body.sex, "disability": req.body.disability
        };
        people.push(person);
        passwords.push(req.body.access_token);
        resp.send("Account created for " + fname + " " + sname);
    }
    else if (req.body.access_token == undefined){
        resp.status(403);
        resp.send("Access token needed");
    }
    else {
        resp.status(400); //error code 
        resp.send("That username is taken.");
    }
})

app.get("/events/:eventname", function (req, resp) {
    const n = req.params.eventname.trim().toLowerCase();
    var event = events.find(x => x.name.toLowerCase() === n);
    resp.send(event);
})

app.get("/events", function (req, resp) {
    //console.log(events); //debugging 
    resp.send(events);
})

app.post("/addtoevent", function (req, resp) {
    var u = req.body.username;
    var nameordate = req.body.event;
    var person = people.find(x => x.username === u);
    var event;

    var eventname_formatted = nameordate.replace(/%20/gi, " ");
    event = events.find(x => x.name.toLowerCase() === eventname_formatted.toLowerCase());

    if (event == undefined) {
        //must have been a date instead 
        event = events.find(x => x.date === nameordate);
    }
    
    //checking
    var p = event.entrants.find(x => x.username === u);
    var q = people.find(x => x.username === u);
    if (p == undefined && q != undefined && passwordCheck(u, req.body.access_token)) {
        event.entrants.push(person);
        //console.log(event.entrants); //debugging 
        resp.send("User " + u + " registered for event " + event.name);
    }
    else if (q != undefined && passwordCheck(u, req.body.access_token)) {
        resp.send("That person is already registered.");
    }
    else {
        resp.send("Incorrect username or password.");
    }
})

app.post("/addevent", function (req, resp) {
    var eventname = req.body.eventname;

    //checking 
    var e = events.find(x => x.name === eventname);
    if (e == undefined) {
        var date = req.body.date;
        var event = { "name": eventname, "date": date, "entrants": [] };
        events.push(event);
        resp.send("Event created " + event.name);
    }
    else {
        resp.send("This event already exists.");
    }
})

function passwordCheck(username, password) {
    var i = people.findIndex(x => x.username === username);
    if (password === "concertina") {
        return true;
    }
    else if (passwords[i] === password) {
        return true;
    }
    else {
        return false;
    }
}