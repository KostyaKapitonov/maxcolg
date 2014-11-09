//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require turbolinks
//= require ang-devise/angular/angular.min.js
//= require angular-route.min
//= require angular-resource.min
//= require angular-sanitize.min
//= require angular/angular_setup
//= require ckeditor-jquery
//= require blockui
///= require ang-devise/angular-devise/lib/devise-min
// = require_tree .

window.$a = {}; //custom app helper

$(document).ready(function(){

});

function cl(text){
    console.log(text);
}

Array.prototype.sample = function(){
    rand = function(min,max)
    {
        if(max == null){
            max = min;
            min = 0;
        } else if (min == null && max == null) return 0;
        return Math.floor(Math.random()*(max-min+1)+min);
    };
    return this[rand(0,this.length-1)];
};

Array.prototype.each = function(callback){
    if(typeof callback != 'function') return;
    for(var i=0; i < this.length; i++){
        callback(this[i], i);
    }
};

Array.prototype.whereId = function(id, p){
    var target = null;
    for(var i=0; i < this.length; i++){
        if(this[i].id == id){
            target = p ? i : this[i];
            break;
        }
    }
    return target;
};

function rand(min,max)
{
    if(max == null){
        max = min;
        min = 0;
    } else if (min == null && max == null) return 0;
    return Math.floor(Math.random()*(max-min+1)+min);
}

function uLoginOauth(token){
    angular.element('[x-ng-controller="MainController"]').scope().uLogin(token);
//    console.log(token);
//    $.getJSON("//ulogin.ru/token.php?host=" +
//        encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?", function(data){
//        console.log(data);
//        data=$.parseJSON(data.toString());
//        if(!data.error){
//            console.log(data);
//        }
//    });
}

$a.alert = function(text, title, onClose){
    if(typeof(onClose) != 'function') onClose =  new Function();
    $('<div><p class="dialog_msg">'+text+'</p><div>').dialog({ modal: true, position: 'top',
        buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ], title: title,
        beforeClose: onClose});
};

$a.cut = function(item){
    item = item+$a.custom_localstorage_prefix;
    var itemData = localStorage.getItem(item);
    if(typeof itemData != 'undefined' && itemData != null) {
        localStorage.removeItem(item);
        return  JSON.parse(itemData).obj;
    }
    return null;
};

$a.set = function(item, data){
    if(!item || !data) {console.log('$a.set - not all params to set'); return null;}
    var obj = {obj: data};
    localStorage.setItem(item+$a.custom_localstorage_prefix, JSON.stringify(obj));
};

$a.wait = function(msg){
    msg = msg || 'Подождите пожалуйста...';
    $.blockUI({
        message: msg,
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
};

$a.done = function(){
    $.unblockUI();
};

$a.custom_localstorage_prefix = '__c';