 var InfoSearchResultView= Backbone.View.extend({

 	el:$('body'),

 	initialize:function(searchResult){
 		_.bindAll(this,'render','showResults','bindEvents','close');

 		this.searchResult = searchResult;
        this.render();	
        this.showResults();
        this.bindEvents();
 	},

 	render:function(){
 		$(this.el).append("<div id='info-full-width' class = 'full-width'>");
 		$('#info-full-width').append("<div id = 'info-title'>根据联系信息找到的结果：</div>");
 		$('#info-full-width').append("<div id = 'info-catContainer' class = 'catContainer'><img id = 'info-cat' class = 'cat' src = 'img/cat.png'/></div>");
 		$('#info-full-width').append("<div><hr></div>");
 		$('#info-full-width').append("<div id = 'info-info' class = 'secondaryInfoContainer'></div>");
 		
 	},

 	showResults:function(){
 		this.searchResultView = new SearchResultView("#info-info", this.searchResult);
 	},

 	bindEvents:function(){
 		$('#info-cat').bind('click',function(){
 			app.navigate("",true);
 		});

 	},

 	close:function(){
 		$('#info-cat').unbind();
        this.unbind();
        $(this.el).empty();

 	}




 });