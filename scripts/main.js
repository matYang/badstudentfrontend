
var miliSecInDay =  86400000;
var infoUrlOverride = "http://localhost:8015/api/badstudent/v0.9/messages";
var recentsUrlOverride = "http://localhost:8015/api/badstudent/v0.9/recentsSearch";
var primaryUrlOverride = "http://localhost:8015/api/badstudent/v0.9/primarySearch";
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
        this.date = new Date();
        this.locationArray = new Array("江苏省", "南京市", "南京大学仙林校区");
    },

    main:function(){
        this.closeAhead("mainPageView");
    	this.mainPageView = new MainPageView(this.date, this.locationArray);

    },

    viewById:function(id){
        this.closeAhead("messageDetailView");
    	//TODO message detail view here
    },

    helpSearch:function(encodedKey){
        this.closeAhead("helpSearchResultView");
        this.decode(encodedKey);
        this.searchResult = new Messages(primaryUrlOverride);
        var locationSting = this.keyArray[0] + " " + this.keyArray[1] + " " + this.keyArray[2];
        var dateString = this.keyArray[3] + " " + this.keyArray[4] + " " + this.keyArray[5];

        console.log(this.keyArray);
        var self = this;
        this.searchResult.fetch({
            data: $.param({ location: locationSting, date: dateString, type: 0}),
            
            dataType:'json',
            
            success: function (model, response) {
                console.log("fetch success with encodedKey: " + encodedKey); 
                console.log(response);
                self.helpSearchResultView = new HelpSearchResultView(self.searchResult,this.date, this.locationArray);
            },
            
            error: function(model, response){
                console.log("fetch failed");
                console.log(response);
                alert("failed to fetch data from server");
            }
        });

    	
    },

    askSearch:function(encodedKey){
    	this.closeAhead("askSearchResultView");
        this.decode(encodedKey);
        this.searchResult = new Messages(primaryUrlOverride);
        var locationSting = this.keyArray[0] + " " + this.keyArray[1] + " " + this.keyArray[2];
        var dateString = this.keyArray[3] + " " + this.keyArray[4] + " " + this.keyArray[5];

        locationSting = encodeURI(locationSting);
        console.log(this.keyArray);
        var self = this;
        this.searchResult.fetch({
            data: $.param({ location: locationSting, date: dateString, type: 1}),
            
            dataType:'json',
            
            success: function (model, response) {
                console.log("fetch success with encodedKey: " + encodedKey); 
                console.log(response);
                self.askSearchResultView = new AskSearchResultView(self.searchResult,this.date, this.locationArray);
            },
            
            error: function(model, response){
                console.log("fetch failed");
                console.log(response);
                alert("failed to fetch data from server");
            }
        });

    },

    infoSearch:function(encodedKey){
    	this.closeAhead("infoSearchResultView");
        this.decode(encodedKey);
        this.searchResult = new Messages(infoUrlOverride);
        //expected key of format email-phone-qq-twitter-selfDefined

        console.log(this.keyArray);
        var self = this;
        this.searchResult.fetch({
            data: $.param({ email: self.keyArray[0], phone: self.keyArray[1], qq: self.keyArray[2], twitter: self.keyArray[3], selfDefined: self.keyArray[4]}),
            
            dataType:'json',
            
            success: function (model, response) {
                console.log("fetch success with encodedKey: " + encodedKey); 
                console.log(response);
                self.infoSearchResultView = new InfoSearchResultView(self.searchResult);
            },
            
            error: function(model, response){
                console.log("fetch failed");
                console.log(response);
                alert("failed to fetch data from server");
            }
        });

    },

    decode:function(encodedKey){
        this.keyArray = encodedKey.split("-");
    },

    closeAhead:function(activeView){
        if (this.helpSearchResultView && activeView != "helpSearchResultView"){
            this.helpSearchResultView.close();
            this.helpSearchResultView = null;
        }
        if (this.askSearchResultView && activeView != "askSearchResultView"){
            this.askSearchResultView.close();
            this.askSearchResultView = null;
        }
        if (this.infoSearchResultView && activeView != "infoSearchResultView"){
            this.infoSearchResultView.close();
            this.infoSearchResultView = null;
        }
        if (this.messageDetailView && activeView != "messageDetailView"){
            this.messageDetailView.close();
            this.messageDetailView = null;
        }
        if (this.mainPageView && activeView != "mainPageView"){
            this.mainPageView.close();
            this.mainPageView = null;
        }

    }
 

 
});

tpl.loadTemplates(['indexTemplate','resultsTemplate'], function () {
    app = new AppRouter();
    Backbone.history.start();
});


