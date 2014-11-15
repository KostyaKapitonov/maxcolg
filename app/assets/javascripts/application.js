// ------------------------------------------------- Requirments ---------------------------------------------

//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require turbolinks
//= require ulogin
//= require ang-devise/angular/angular.min.js
//= require angular-route.min
//= require angular-resource.min
//= require angular-sanitize.min
//= require angular/angular_setup
//= require ckeditor-jquery
//= require blockui
//= require ang-devise/angular-devise/lib/devise
// = require_tree .

// -------------------------------------------------- System -------------------------------------------------

window.$a = {}; //custom app helper

$(document).ready(function(){

});

function cl(text){
    console.log(text);
}

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
}

//------------------------------------------------Prototypes----------------------------------------------
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

//----------------------------------------------------Alerts------------------------------------------------
$a.alert = function(text, title, onClose){
    if(typeof(onClose) != 'function') onClose =  new Function();
    $('<div><p class="dialog_msg">'+text+'</p><div>').dialog({ modal: true, position: 'top',
        buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ], title: title,
        beforeClose: onClose});
};

$a.infoDurationMs = 450;
$a.infoDurationHideRelation = 1.5;
$a.infoBeforeCloseMs = 1200;

$a.info = function(text, isError){
    var cls = isError ? 'dialogError' : '';
    var durationMs = 300;
    var beforeCloseMs = 1500;
    var element = $('<div class="'+cls+'"><p class="dialog_msg">'+text+'</p><div>');
    element.dialog({ dialogClass: 'autoClose', modal: false, position: 'left top', width: 275,
        minHeight: 20, resizable: false,
        show: { effect: "drop", easing: 'easeOutCubic',duration: $a.infoDurationMs},
        hide: {effect: "drop", easing: 'easeInSine', duration: $a.infoDurationMs * $a.infoDurationHideRelation},
        beforeClose: function(){
            setTimeout(function(){  element.dialog("destroy");  },
                    $a.infoBeforeCloseMs + $a.infoDurationMs * $a.infoDurationHideRelation);
        }
    });
    setTimeout(function(){  element.dialog('close');  },beforeCloseMs+durationMs*2);
};

$a.err = function(text){
    $a.info(text, true);
};

$a.show_errors = function(errs){
    var list = '<ul>';
    errs.each(function(e){
        list+='<li>'+e+'</li>'
    });
    list+='</ul>';
    $a.alert(list,'Ошибка');
};

$a.confirm = function(text, callback){
    $('<div><p class="dialog_msg">'+text+'</p><div>').dialog({ modal: true, position: 'top', title: 'Поддтвердите действие',
        buttons: [
            { text: "Да",  click: function() { $( this ).dialog( "close" );
                if(typeof callback == 'function') callback();} },
            { text: "Нет", click: function() { $( this ).dialog( "close" ); } }
        ]});
};

// --------------------------------------------------localStorage-----------------------------------------
$a.custom_localstorage_prefix = '__c';

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

// --------------------------------------------------Spiner-----------------------------------------
$a.wait = function(msg, msBeforeException){
    msBeforeException = msBeforeException || 15000;
    if(!this.blocked){
        this.blocked = true;
    } else {
        clearTimeout(this.exception);
    }
    this.exception = setTimeout(function(){
        $a.done();
        $a.alert('<b>Пожалуйста, попробуйте еще раз.</b><br/>В случае повтора ошибки обновите страницу, а так же проверьте подключение к интернету.','Неизвестная ошибка');
    },msBeforeException);

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
    this.blocked = false;
    clearTimeout(this.exception);
    $.unblockUI();
};

//-------------------------------------------------------------------------------------------------------

