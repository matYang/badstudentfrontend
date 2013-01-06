
var miliSecInDay =  86400000;
var infoUrlOverride = "http://localhost:8015/api/badstudent/v0.9/messages";
var recentsUrlOverride = "http://localhost:8015/api/badstudent/v0.9/recentsSearch";
var primaryUrlOverride = "http://localhost:8015/api/badstudent/v0.9/primarySearch";
var authUrlOverride = "http://localhost:8015/api/badstudent/v0.9/auth";
var modalOpen = false;    //global variable used to tract if a modal window is open
var doubleModalOpen = false;
var tpId = 1000;

/*
var browserInfo = {'opera' : false, 'chrome' : false, 'safari' : false, 'firefox' : false, 'msie' : false};
var browserName = navigator.sayswho[0];
if (browserName == 'Msie'){
    browserInfo.msie = true;
}
else if (browserName == 'Chrome'){
    browserInfo.chrome = true;
}
else if (browserName == 'Safari'){
    browserInfo.safari = true;
}
else if (browserName == 'Firefox'){
    browserInfo.firefox = true;
}
else if (browserName == 'Opera'){
    browserInfo.opera = true;
}*/



var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"main",
        "message/:id":"viewById",
        "help/*encodedSearchKey":"helpSearch",
        "ask/*encodedSearchKey":"askSearch",
        "info/*encodedSearchKey":"infoSearch",
        "tempSession/:id" : "tempSession"
    },
 
    initialize:function () {
        this.keyArray = new Array();
        this.searchResult = new Messages();
        this.date = new Date();
        this.locationArray = new Array("江苏省", "南京市", "南京大学仙林校区");
    },

    main:function(){
        this.closeAhead("mainPageView");
        if (this.mainPageView){
            this.mainPageView.close();
        }
    	this.mainPageView = new MainPageView(this.date, this.locationArray);

    },

    viewById:function(id){
        this.closeAhead("messageDetailView");
        id = decodeURI(id);
    	//TODO message detail view here
        var message = new Message();
        var self = this;

        message.set({'id': id});
        message.fetch({
            dataType:'json',

            success:function(model, response){
                console.log("viewById::fetch success with id: " + id);
                console.log(response);
                if (self.messageDetailView){
                    self.messageDetailView.close();
                }
                self.messageDetailView = new MessageDetailView(message);
            },

            error: function(model, response){
                console.log("viewById::fetch failed");
                console.log(response);
                alert("viewById::failed to fetch data from server");
            }
        });
    },

    //used to find helpers
    helpSearch:function(encodedKey){
        this.closeAhead("helpSearchResultView");
        encodedKey = decodeURI(encodedKey);
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
                console.log("helpSearch::fetch success with encodedKey: " + encodedKey); 
                console.log(response);
                if (self.helpSearchResultView){
                    self.helpSearchResultView.close();
                }
                self.helpSearchResultView = new HelpSearchResultView(self.searchResult,self.date, self.locationArray);
            },
            
            error: function(model, response){
                console.log("helpSearch::fetch failed");
                console.log(response);
                alert("helpSearch::failed to fetch data from server");
            }
        });

    	
    },

    //used to find askers
    askSearch:function(encodedKey){
    	this.closeAhead("askSearchResultView");
        encodedKey = decodeURI(encodedKey);
        this.decode(encodedKey);
        this.searchResult = new Messages(primaryUrlOverride);
        var locationSting = this.keyArray[0] + " " + this.keyArray[1] + " " + this.keyArray[2];
        var dateString = this.keyArray[3] + " " + this.keyArray[4] + " " + this.keyArray[5];

        locationSting = encodeURI(locationSting);
        console.log(this.keyArray);
        var self = this;
        this.searchResult.fetch({
            data: $.param({ location: locationSting, date: dateString, type: 0}),
            
            dataType:'json',
            
            success: function (model, response) {
                console.log("askSearch::fetch success with encodedKey: " + encodedKey); 
                console.log(response);
                if (self.askSearchResultView){
                    self.askSearchResultView.close();
                }
                self.askSearchResultView = new AskSearchResultView(self.searchResult, self.date, self.locationArray);
            },
            
            error: function(model, response){
                console.log("askSearch::fetch failed");
                console.log(response);
                alert("askSearch::failed to fetch data from server");
            }
        });

    },

    infoSearch:function(encodedKey){
    	this.closeAhead("infoSearchResultView");
        encodedKey = decodeURI(encodedKey);
        this.decode(encodedKey);
        this.searchResult = new Messages(infoUrlOverride);
        //expected key of format email-phone-qq-twitter-selfDefined

        console.log(this.keyArray);
        var self = this;
        this.searchResult.fetch({
            data: $.param({ email: decodeURI(self.keyArray[0]), phone: decodeURI(self.keyArray[1]), qq: decodeURI(self.keyArray[2]), twitter: decodeURI(self.keyArray[3]), selfDefined: decodeURI(self.keyArray[4])}),
            
            dataType:'json',
            
            success: function (model, response) {
                console.log("infoSearch::fetch success with encodedKey: " + encodedKey); 
                console.log(response);
                if (self.infoSearchResultView){
                    self.infoSearchResultView.close();
                }
                self.infoSearchResultView = new InfoSearchResultView(self.searchResult);
            },
            
            error: function(model, response){
                console.log("infoSearch::fetch failed");
                console.log(response);
                alert("infoSearch::failed to fetch data from server");
            }
        });

    },

    tempSession:function(id){
        this.closeAhead("tempSession");
        this.navigate("message/" + id, true);
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

tpl.loadTemplates(['indexTemplate','resultsTemplate','detailTemplate','editTemplate'], function () {
    app = new AppRouter();
    Backbone.history.start();
});


