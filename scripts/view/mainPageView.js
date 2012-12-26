 var MainPageView = Backbone.View.extend({

 	el: $('body'),

 	events: {


 	},

 	initialize:function(recentsResults){
 		_.bindAll(this, 'render');
 		this.recentsResults = recentsResults;

 		
 	}




 });