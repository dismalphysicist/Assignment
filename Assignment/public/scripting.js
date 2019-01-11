"use strict";

function formhandler() {
    var u = $("#username").val();

    $.get("http://localhost:1337/people/:username", "username=" + u,
        function (data) {
            $('#searchresult').html(data);
        });

    return false;
}

//function allHandler() {
//    $.get("http://localhost:1337/people", "",
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

        $.post("http://localhost:1337/addperson",
            "username=" + $("#addPerson1").val() + "&" + "forename=" + $("#addPerson2").val() + "&" +
            "surname=" + $("#addPerson3").val() + "&" + "dob=" + $("#DoB").val() + "&" + "sex=" + sex + "&" +
            "disability=" + disability,
            function (data) {
                $("#added").html(data);
            })
        $("#searchresult").html(""); //clear search results when person is added
        document.getElementById("searchform").reset();
        document.getElementById("addform").reset(); //how to not do this when username is taken? 
        return false;
    }
}

function eventsearch() {
    var n = $("#eventname").val();

    $.get("http://localhost:1337/events/:eventname", "name=" + n,
        function (data) {
            $('#eventsearchresult').html(data);
        });

    return false;
}

$("#submitButton").click(formhandler);
$("#myform").submit(formhandler);
// $("#allthesongs").click(allHandler);
$("#addButton").click(add);

$("#eventsubmitButton").click(eventsearch);