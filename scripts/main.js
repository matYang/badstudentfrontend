
var miliSecInDay =  86400000;
var infoUrlOverride = "http://localhost:8015/api/badstudent/v0.9/messages";
var recentsUrlOverride = "http://localhost:8015/api/badstudent/v0.9/recentsSearch";
var primaryUrlOverride = "http://localhost:8015/primarySearch";
var modalOpen = false;    //global variable used to tract if a modal window is open


var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"main",
        "message/:id":"viewById",
        "help/*encodedSearchKey":"helpSearch",
        "ask/*encodedSearchKey":"askSearch",
        "info/*encodedSearchKey":"infoSearch",
    },
 
    initialize:function () {
        this.keyArray = new Array();
        this.searchResult = new Messages();
    },

    main:function(){
    	this.mainPageView = new MainPageView();

    },

    viewById:function(id){
    	//TODO message detail view here
    },

    helpSearch:function(encodedKey){
        if (this.mainPageView){
            this.mainPageView.close();
        }
        //expected key of formmat province-city-university-year-month-year
        this.decode(encodedKey);

        var self = this;

        this.searchResult.fetch({
        data: $.param({ location: locationSting, date: dateString}),
        
        dataType:'json',
        
        success: function (model, response) {
            console.log("fetch success with encodedKey: " + encodedKey); 
            console.log(response);
            self.helpSearchResultView = new HelpSearchResultView(self.searchResults);
        },
        
        error: function(model, response){
            console.log("fetch failed");
            console.log(response);
            alert("failed to fetch data from server");
        }
    });

    	
    },

    askSearch:function(encodedKey){
    	if (this.mainPageView){
            this.mainPageView.close();
        }
        //expected key of formmat province-city-university-year-month-year


    },

    infoSearch:function(encodedKey){
    	if (this.mainPageView){
            this.mainPageView.close();
        }
        //expected key of formmat email-phone-qq-twitter-selfDefined


    },

    decode:function(encodedKey){
        this.keyArray = encodedKey.split("-");
    }
 

 
});

tpl.loadTemplates(['resultsTemplate'], function () {
    app = new AppRouter();
    Backbone.history.start();
});


