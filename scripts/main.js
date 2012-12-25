var messages = new Messages();
window miliSecInDay =  86400000;


var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"main",
        "/:id":"viewById",
        "/help/*UrlEcodedSearchKey":"helpSearch",
        "/ask/*UrlEcodedSearchKey":"askSearch",
        "info/*UrlEcodedSearchKey":"infoSearch",
    },
 
    initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },

    main:function(){
    	this.wineList = new WineCollection();
        var self = this;
        this.wineList.fetch({
            success:function () {
                self.wineListView = new WineListView({model:self.wineList});
                $('#sidebar').html(self.wineListView.render().el);
                if (self.requestedId) self.wineDetails(self.requestedId);
            }
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

