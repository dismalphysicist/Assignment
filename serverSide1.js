"use strict";
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

var people = [{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire"}];
var numbers = [1,2,3];

app.get("/numbers", function(req, resp){
    const n = req.query.number;
	console.log("communicated");
    resp.send("hello world " + n);
})

app.get("/allnumbers",function(req,resp){
    resp.send("All numbers: " + numbers);
})

/* app.post('/newsong', function(req, resp){
	
    const t = req.body.number;
    numbers.append(t);
    
    resp.send("number added" + t);
    
}) */

app.listen(8090);