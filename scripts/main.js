
var miliSecInDay =  86400000;
var infoUrlOverride = "http://localhost:8015/api/badstudent/v0.9/messages";
var recentsUrlOverride = "http://localhost:8015/api/badstudent/v0.9/recentsSearch";
var primaryUrlOverride = "http://localhost:8015/primarySearch";
var modalOpen = false;    //global variable used to tract if a modal window is open


var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"main",
        "/:id":"viewById",
        "/help/*UrlEcodedSearchKey":"helpSearch",
        "/ask/*UrlEcodedSearchKey":"askSearch",
        "info/*UrlEcodedSearchKey":"infoSearch",
    },
 
    initialize:function () {

    },

    main:function(){
    	this.mainPageView = new MainPageView();

    },

    viewById:function(id){
    	//TODO message detail view here
    },

    helpSearch:function(encodedKey){
    	//TODO, decode the encoded key and check for helpSearch
    },

    askSearch:function(encodedKey){
    	//TODO, decode the encoded key and check for askSearch
    },

    infoSearch:function(encodedKey){
    	//TODO, decode the encoded key and check for infoSearch
    },
 

 
});

tpl.loadTemplates(['resultsTemplate'], function () {
    app = new AppRouter();
    Backbone.history.start();
});


