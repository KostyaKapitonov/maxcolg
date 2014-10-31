
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery-ui
//= require angular.js
//= require angular-route.min
//= require angular-resource.min
//= require angular-sanitize.min
//= require angular/angular_setup
//= require_tree .

function cl(text){
    console.log(text);
}

$(document).ready(function(){

});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}