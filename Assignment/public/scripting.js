"use strict";

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
        var sex = "M";
        if ($("#sexF").val() == "F") {
            sex = "F";
        }
        var disability = false;
        if ($("#addPersonDisability").val() == "d") {
            disability = true;
        }

        $.post("http://localhost:8090/people",
            {
                username: $("#addPerson1").val(),
                forename: $("#addPerson2").val(),
                surname: $("#addPerson3").val(),
                dob: $("#DoB").val(),
                sex: sex,
                disability: disability
            },
            function (data) {
                $("#added").html(data);
            })

        //$("#searchresult").html(""); //clear search results when person is added
        //document.getElementById("searchform").reset();
        //document.getElementById("addform").reset(); //how to not do this when username is taken? 
        //update();
        return false;
    //}
}

function eventsearch() {
    var n = $("#eventname").val();

    $.get("http://localhost:8090/events/:eventname", "name=" + n,
        function (data) {
            $('#eventsearchresult').html(data + '<button id="registerinterest">Register interest</button>');
            $("#registerinterest").click(register(data));
        });

    return false;
}

function register(event) { //WIP
    var i = event.search(":");
    var eventname = event.slice(0, i); 

    $('#eventsearchresult').append();

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

function addtoevent() {
    $.post("http://localhost:8090/addtoevent", "username=" + $("#user").val()
        + "&" + "eventID=" + $("#event").val(), function (data) {
            $("#addedtoevent").html(data);
        })
    $("#searchresult").html(""); //clear search result 
    $("#added").html("");
    return false; 
}

window.onload = update();

$("#submitButton").click(formhandler);
$("#myform").submit(formhandler);
// $("#allthesongs").click(allHandler);
$("#addButton").click(add);
$("#addform").submit(add);

$("#eventsubmitButton").click(eventsearch);
$("#eventsearchform").submit(eventsearch);

$("#eventaddperson").click(addtoevent);
$("#eventaddpersonform").submit(addtoevent);