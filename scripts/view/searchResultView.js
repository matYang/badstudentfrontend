 var SearchResultView= Backbone.View.extend({


 	initialize:function(targetId, searchResults, gender){
 		_.bindAll(this,'render');

 		this.template = _.template(tpl.get('resultsTemplate')),

        this.targetId = targetId;
        this.searchResults = searchResults;
        this.gender = gender;

        console.log("SearchResultView opening with targetId: " + this.targetId + " and Message Collection: " + this.searchResults);
        this.render();
 	},

 	render:function(){
 		if (this.gender == 2){
 			for (var i = 0; i < this.searchResults.length; i++){
            	$(this.targetId).append(this.template(this.searchResults.at(i).toJSON()));
            }
        }
 		else if (this.gender == 0 || this.gender == 1){
 			for (var i = 0; i < this.searchResults.length; i++){
 				if (this.searchResults.at(i).get('gender') == this.gender){
 					$(this.targetId).append(this.template(this.searchResults.at(i).toJSON()));
 				}
            	
            }
 		}

		 		
 	},

 	close:function(){
        $(this.targetId).empty();
        this.unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
 	}




 });