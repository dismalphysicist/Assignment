"use strict";

function formhandler() {
    var u = $("#username").val();
    // $("#writeIn").append(n + ", ");

    $.get("http://localhost:1337/people/:username", "username=" + u,
        function (data) {
            $('#writein').append(data);
            //var btn = document.createElement("BUTTON");        // Create a <button> element
            //var t = document.createTextNode("CLICK ME");       // Create a text node
            //btn.appendChild(t);                                // Append the text to <button>
            //$("#writein").append(btn);
        });
    return false;
}

function allHandler() {
    $.get("http://localhost:1337/people", "",
        function (data) {
            console.log(data);
            $('#writein').append(data);
        });
    return false;
}

function add() {
    var uname = $("#addPerson1").val();
    var fname = $("#addPerson2").val();
    var sname = $("#addPerson3").val();
    $.post("http://localhost:1337/addperson", 
        "username=" + uname + "&" + "forename=" + fname +"&"+ "surname=" + sname,
        function (data) {
            $("#writein").append(data);
        })
    return false;
}

$("#submitButton").click(formhandler);
$("#myform").submit(formhandler);
// $("#allthesongs").click(allHandler);
$("#addButton").click(add);