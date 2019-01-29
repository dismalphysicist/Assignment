"use strict";

// thanks to Nico Tejera at https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
// returns something like "access_token=concertina&username=bobthebuilder"
function serialise(obj) {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

function formhandler() {
    var u = $("#username").val().trim();

    $.get("http://localhost:8090/people/" + u, "",
        function (data) {
            if (data.username !== undefined) {                
                $('#searchresult').html(data.forename + " " + data.surname);
            }
            else {
                $('#searchresult').html(" This user does not exist");
            }
        });

    return false;
}

//function allHandler() {
//    $.get("http://localhost:8090/people", "",
//        function (data) {
//            console.log(data);
//            $('#writein').append(data);
//        });
//    return false;
//}

function add() {

    //console.log($("#DoB").val()); //debugging 

    if ($("#addPerson1").val() == "" | $("#addPerson2").val() == "" | $("#addPerson3").val() == "" | $("#DoB").val() == "") {
        $("#added").html("Please fill in all fields.");
        return false;
    }
    else { 
        var sex, disability;
        if ($("#sexF").val() == true) {
            sex = "F";
        }
        else {
            sex = "M";
        }

        if ($("#addPersonDisability").val() == true) {
            disability = true;
        }
        else {
            var disability = false;
        }

        $.post("http://localhost:8090/people",
            {
                username: $("#addPerson1").val(),
                forename: $("#addPerson2").val(),
                surname: $("#addPerson3").val(),
                dob: $("#DoB").val(),
                sex: sex,
                disability: disability,
                access_token: "concertina"
            },
            function (data) {
                if (data.status == "400") {
                    //bad request
                    console.log("That username is taken.");
                    $("#added").html("That username is taken.");
                }
                else {
                    $("#added").html(data);
                    document.getElementById("addform").reset();
                }
            })

        $("#searchresult").html(""); //clear search results when person is added
        document.getElementById("searchform").reset();
        update();
        return false;
    }
}

function createAccount() {
    if ($("#createaccountusername").val() == "" | $("#createaccountforename").val() == "" | $("#createaccountsurname").val() == "" | $("#indexDoB").val() == "" | $("#password").val() == "") {
        $("#createdaccount").html("Please fill in all fields.");
        return false;
    }
    else {
        var sex, disability;
        if ($("#indexsexF").val() == true) {
            sex = "F";
        }
        else {
            sex = "M";
        }

        if ($("#indexaddPersonDisability").val() == true) {
            disability = true;
        }
        else {
            var disability = false;
        }

        $.post("http://localhost:8090/people",
            {
                username: $("#createaccountusername").val(),
                forename: $("#createaccountforename").val(),
                surname: $("#createaccountsurname").val(),
                dob: $("#indexDoB").val(),
                sex: sex,
                disability: disability,
                access_token: $("#password").val()
            },
            function (data) {
                if (data.status == "400") {
                    //bad request
                    console.log("That username is taken.");
                    $("#createdaccount").html("That username is taken.");
                }
                else {
                    $("#createdaccount").html(data);
                    document.getElementById("indexaddform").reset();
                }
            })

        //this is create an account 
        $("#indexcreateaccount").collapse();
        update();
        return false;
    }
}

function eventsearch() {
    var n = $("#eventname").val();

    if (n !== "") {
        $.get("http://localhost:8090/events/" + n, "",
            function (data) {
                if (data.name !== undefined) {
                    $("#eventsearchresult").html(data.name + ": " + data.date
                        + '<br><button id="registerinterest">Register interest</button>'
                        + '<br><button id="cleareventsearch">Clear search</button>');

                    $("#registerinterest").click(function () {
                        $("#eventsearchresult").append('<div id="showwhenregistering"> <form id="registerforeventform"> Username: <input type="text" id="uname" /> Password: <input type="text" id="password1" /><button id="reg">Register</button></form></div>');
                        $("#reg").click(register);
                    });

                    $("#cleareventsearch").click(reseteventform);
                }
                else {
                    $("#eventsearchresult").html("This event does not exist");
                }
            });
    }

    return false;
}


function register() {
    $.post("http://localhost:8090/addtoevent/", {
        username: $("#uname").val(),
        eventname: $("#eventname").val().trim(), //note may have either upper/lowercase 
        access_token: $("password1").val()
    },
    function (req, resp) {
        $('#eventsearchresult').html("You are now registered");
    })
    return false;
}



function addtoevent() {
    $.post("http://localhost:8090/addtoevent", "username=" + $("#user").val()
        + "&" + "eventID=" + $("#event").val(), function (data) {
            $("#addedtoevent").html(data);
        })
    $("#searchresult").html(""); //clear search result 
    $("#added").html("");
    return false;
}

function update() {

    $.get("http://localhost:8090/people", "",
        function (data) {
            var options = '<select id="user">';
            for (var i = 0; i < data.length; i++) {
                var person = data[i];
                options += '<option value=' + person.username + '>' + person.forename + " " + person.surname + '</option>';
            }
            options += '</select>';
            $("#useroptions").html(options);
        });

    $.get("http://localhost:8090/events", "",
        function (data) {
            var options = '<select id="event">';
            for (var i = 0; i < data.length; i++) {
                var event = data[i];
                options += '<option value=' + i + '>' + event.name + " " + event.date + '</option>';
            }
            options += '</select>';
            $("#eventoptions").html(options);
        });
}

function reseteventform() {
    document.getElementById("eventsearchform").reset();
    $("#eventsearchresult").html("");
}

window.onload = update();
window.onload = $("#showwhenregistering").hide();

$("#submitButton").click(formhandler);
$("#myform").submit(formhandler);
// $("#allthesongs").click(allHandler);
$("#addButton").click(add);
$("#addform").submit(add);

$("#createButton").click(createAccount);
$("#indexaddform").submit(createAccount);

$("#eventsubmitButton").click(eventsearch);
$("#eventsearchform").submit(eventsearch);

$("#eventaddperson").click(addtoevent);
$("#eventaddpersonform").submit(addtoevent);