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
 		$('#info-full-width').append("<div id='infoSearchHeader'><div>根据联系信息找到的结果：</div><img id = 'info-cat' src = 'img/cat.png'/></div>");
 		$('#info-full-width').append("<div id = 'info-info'></div>");
 		
 	},

 	showResults:function(){
 		this.searchResultView = new SearchResultView("#info-info", this.searchResult, 2);
 	},

 	bindEvents:function(){
 		$('#info-cat').bind('click',function(){
 			app.navigate("",true);
 		});

 	},

 	close:function(){
 		$('#info-cat').unbind();
        this.unbind();

        var datePickerDiv = $('#ui-datepicker-div');        //reserve the datepicker div
        $(this.el).empty();
        
        $(this.el).append(datePickerDiv);                   //inject into dom for future uses

 	}




 });