 var SearchResultView= Backbone.View.extend({


 	initialize:function(targetId, recentsResults){
 		_.bindAll(this,'render');

 		this.template = _.template(tpl.get('resultsTemplate')),

        this.targetId = targetId;
        this.recentsResults = recentsResults;
        console.log("SearchResultView opening with targetId: " + this.targetId + " and Message Collection: " + this.recentsResults);
        this.render();
 	},

 	render:function(){

        for (var i = 0; i < this.recentsResults.length; i++){
            $(this.targetId).append(this.template(this.recentsResults.at(i).toJSON()));
        }
 		

 	},




 });