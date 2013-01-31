var miliSecInDay =  86400000;
var infoUrlOverride = origin + "/api/badstudent/v0.9/messages";
var recentsUrlOverride = origin + "/api/badstudent/v0.9/recentsSearch";
var primaryUrlOverride = origin + "/api/badstudent/v0.9/primarySearch";
var authUrlOverride = origin + "/api/badstudent/v0.9/auth";
var modalOpen = false;    //global variable used to track if a modal window is open
var doubleModalOpen = false;
var tpId = 1000;
/* web storage:: local storage*/
var supportStorage = isStorageSupported();
var storage = {'email':"", 'phone':"", 'qq':"", 'twitter':"", 'selfDefined':"", 'province':"", 'city':"", 'school':""};
if (supportStorage){
    tempEmail = localStorage.email;
    tempPhone = localStorage.phone;
    tempQq = localStorage.qq;
    tempTwitter = localStorage.twitter;
    tempSelfDefined = localStorage.selfDefined;
    tempLocationString = localStorage.locationString;
    if (tempEmail){
        storage.email = tempEmail;
    }
    if (tempPhone){
        storage.phone = tempPhone;
    }
    if (tempQq){
        storage.qq = tempQq;
    }
    if (tempTwitter){
        storage.twitter = tempTwitter;
    }
    if (tempSelfDefined){
        storage.selfDefined = tempSelfDefined;
    }
    if (tempLocationString){
        var tempLocationArray = tempLocationString.split(' ');
        storage.province = tempLocationArray[0];
        storage.city = tempLocationArray[1];
        storage.school = tempLocationArray[2];
    }
}
//to enable place holders in IE 8 using the placeHolder jquery plugin
$('input, textarea').placeholder();


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
        this.date.setHours(0,0,0,0);
        this.minimumDate = new Date();
        //after 11:30pm, set the minimum date next day
        if (this.minimumDate.getHours() == 23 && this.minimumDate.getMinutes() >= 29){
            this.minimumDate.setDate((this.minimumDate.getDate() + 1));
        }
        this.minimumDate.setHours(0,0,0,0);
        if (storage.city){
            this.locationArray = new Array(storage.province, storage.city, storage.school);
        }
        else{
            this.locationArray = new Array("江苏", "南京市", "南京大学仙林校区");
        }
        
    },

    main:function(){
        this.closeAhead("mainPageView");
        if (this.mainPageView){
            this.mainPageView.close();
        }
    	this.mainPageView = new MainPageView(this.date, this.locationArray);
        this.feedBackView = new FeedBackView();

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

                if (self.messageDetailView){
                    self.messageDetailView.close();
                }
                self.messageDetailView = new MessageDetailView(message);
                self.feedBackView = new FeedBackView();
            },

            error: function(model, response){

                alert("无法连接服务器");
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

        var self = this;
        this.searchResult.fetch({
            data: $.param({ location: locationSting, date: dateString, type: 1}),
            
            dataType:'json',
            
            success: function (model, response) {

                if (self.helpSearchResultView){
                    self.helpSearchResultView.close();
                }
                self.helpSearchResultView = new HelpSearchResultView(self.searchResult,self.date, self.locationArray);
                self.feedBackView = new FeedBackView();
            },
            
            error: function(model, response){
                
                alert("无法连接服务器");
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
        
        var self = this;
        this.searchResult.fetch({
            data: $.param({ location: locationSting, date: dateString, type: 0}),
            
            dataType:'json',
            
            success: function (model, response) {

                if (self.askSearchResultView){
                    self.askSearchResultView.close();
                }
                self.askSearchResultView = new AskSearchResultView(self.searchResult, self.date, self.locationArray);
                self.feedBackView = new FeedBackView();
            },
            
            error: function(model, response){

                alert("无法连接服务器");
            }
        });

    },

    infoSearch:function(encodedKey){
    	this.closeAhead("infoSearchResultView");
        encodedKey = decodeURI(encodedKey);
        this.decode(encodedKey);
        this.searchResult = new Messages(infoUrlOverride);
        //expected key of format email-phone-qq-twitter-selfDefined

        var self = this;
        this.searchResult.fetch({
            data: $.param({ email: decodeURI(self.keyArray[0]), phone: decodeURI(self.keyArray[1]), qq: decodeURI(self.keyArray[2]), twitter: decodeURI(self.keyArray[3]), selfDefined: decodeURI(self.keyArray[4])}),
            
            dataType:'json',
            
            success: function (model, response) {

                if (self.infoSearchResultView){
                    self.infoSearchResultView.close();
                }
                self.infoSearchResultView = new InfoSearchResultView(self.searchResult);
                self.feedBackView = new FeedBackView();
            },
            
            error: function(model, response){

                alert("无法连接服务器");
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


