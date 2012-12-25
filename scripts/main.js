
var miliSecInDay =  86400000;
var infoUrlOverride = "http://localhost:8015/api/badstudent/v0.9/messages";
var recentsUrlOverride = "http://localhost:8015/api/badstudent/v0.9/recentsSearch";
var primaryUrlOverride = "http://localhost:8015/primarySearch";


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

    	this.recentsResults = new Messages(recentsUrlOverride);
        var self = this;
        this.recentsResults.fetch({

        	dataType:'json',

            success:function (model, response) {
                self.mainPageView = new MainPageView(self.recentsResults);
                console.log("recents fetch successed: " + response);
            },

            error:function (response){
            	alert("model fetch failure, current URL:" + self.recentsResults.url);
            	console.log("recents fetch failed: " + response);
            },

        });

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

app = new AppRouter();
Backbone.history.start();

