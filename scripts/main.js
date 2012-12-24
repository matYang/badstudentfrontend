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

    },

    viewById:function(id){

    },

    helpSearch:function(encodedKey){

    },

    askSearch:function(encodedKey){

    },

    infoSearch:function(encodedKey){

    },
 
    list:function () {
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
 
    wineDetails:function (id) {
        if (this.wineList) {
            this.wine = this.wineList.get(id);
            if (this.wineView) this.wineView.close();
            this.wineView = new WineView({model:this.wine});
            $('#content').html(this.wineView.render().el);
        } else {
            this.requestedId = id;
            this.list();
        }
    },
 
    newWine:function () {
        if (app.wineView) app.wineView.close();
        app.wineView = new WineView({model:new Wine()});
        $('#content').html(app.wineView.render().el);
    }
 
});

function main(user){
	

	console.log("start fetching"); 
	messages.fetch({
		
		dataType:'json',
		
        success: function (model, response) {
            console.log("fetch success"); 
            console.log(response);
            mainInit();
        },
        
		error: function(model, response){
			console.log("fetch failed");
			console.log(response);
			alert("failed to fetch data from server");
		}
    });

	
}