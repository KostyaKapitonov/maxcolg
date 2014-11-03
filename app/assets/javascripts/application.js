
//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require turbolinks
//= require angular.js
//= require angular-route.min
//= require angular-resource.min
//= require angular-sanitize.min
//= require angular/angular_setup
//= require ckeditor-jquery
//= require_tree .

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