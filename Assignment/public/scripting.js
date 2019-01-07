"use strict";

function formhandler() {
    var u = $("#username").val();

    $.get("http://localhost:1337/people/:username", "username=" + u,
        function (data) {
            $('#writein').html(data);
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

    var sex = "M";
    if ($("#sexF").val() == true) {
        sex = "F";
    }
    var disability = false;
    if ($("#addPersonDisability").val() == true) {
        disability = true;
    }

    $.post("http://localhost:1337/addperson", 
        "username=" + $("#addPerson1").val() +"&"+ "forename=" + $("#addPerson2").val() +"&"+ 
        "surname=" + $("#addPerson3").val() +"&"+ "dob=" + $("#DoB").val() +"&"+ "sex=" + sex +"&"+ 
        "disability=" + disability,
        function (data) {
            $("#writein").html(data);
        })
    return false;
}

$("#submitButton").click(formhandler);
$("#myform").submit(formhandler);
// $("#allthesongs").click(allHandler);
$("#addButton").click(add);