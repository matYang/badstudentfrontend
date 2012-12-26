 var MainPageView = Backbone.View.extend({

 	el: $('body'),

 	events: {


 	},

 	initialize:function(){
 		_.bindAll(this, 'getRecents','render');
 		this.getRecents();
 	},

 	getRecents: function(){
 		this.recentsResults = new Messages(recentsUrlOverride);
        var self = this;
        this.recentsResults.fetch({

        	dataType:'json',

            success:function (model, response) {
                self.searchResultView = new SearchResultView("#main-info", self.recentsResults);
                console.log("recents fetch successed: " + response);
            },

            error:function (response){
            	alert("model fetch failure, current URL:" + self.recentsResults.url);
            	console.log("recents fetch failed: " + response);
            },

        });
 	},

 	render:function(){
 		
 	},




 });