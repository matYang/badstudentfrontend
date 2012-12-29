 var AskSearchResultView= Backbone.View.extend({

 	el:$('body'),

 	initialize:function(searchResult, date, locationArray){
 		_.bindAll(this,'render','showResults','bindEvents','close');

 		this.searchResult = searchResult;
        this.render();	
        this.showResults();
        this.bindEvents();
 	},

 	render:function(){
 		$(this.el).append("<div id='ask-full-width' class = 'full-width'>");
 		$('#ask-full-width').append("<div id = 'ask-upper-container' class = 'upper-container'></div>");
 		$('#ask-upper-container').append("<div id = 'ask-title'>创建您的点名需求</div>");
 		$('#ask-upper-container').append("<div id = 'ask-catContainer' class = 'catContainer'><img id = 'ask-cat' class = 'cat' src = 'img/cat.png'/></div>");
 		$('#ask-upper-container').append("<div id = 'ask-createContainer' class = 'createContainer'></div>");
 		$('#ask-upper-container').append("<div id = 'ask-submit'>我勒个去<img id = 'ask-submit-icon' src = 'img/submit.png'></div>");	

 		$('#ask-createContainer').append("<p>我在 <div id = 'ask-input-location' class = 'ask-input-box'></div> 附近 求 <input id = 'ask-input-content' class = 'ask-input-box'/> ，这节课在 <input id = 'ask-input-datePicker' class = 'ask-input-box'/> 。我需要一个 <input id = 'ask-input-gender' class = 'ask-input-box' /> 这节课我愿意付 <input id = 'ask-input-price' class = 'ask-input-box' /> 元！</p>");

 		$('#ask-full-wid').append("<div id = 'ask-lower-container' class = 'lower-container'></div>");
 		$('#ask-lower-container').append("<div id = 'ask-alternative-tiitle' class = 'alternative-title'>或者看这里</div>");
 		$('#ask-lower-container').append("<div id = 'ask-genderContainer' class = 'genderContainer'></div>");
 		$('#ask-genderContainer').append("<div id = 'ask-gender-female' class = 'gender-selection'>只看女生</div>");
 		$('#ask-genderContainer').append("<div id = 'ask-gender-male' class = 'gender-selection'>只看男生</div>");
 		$('#ask-genderContainer').append("<div id = 'ask-gender-dontCare' class = 'gender-selection'>无所谓</div>");

 		$('#ask-lower-container').append("<div id = 'ask-info' class = 'secondaryContainer'></div>");



 		$('#ask-input-location').html(this.locationArray[1] + " " + this.locationArray[2]);

 		$('#ask-input-datePicker').datepicker({
            onSelect: function(dateText, inst) { 
                self.date = new Date(dateText);
            },

            onClose: function(dateText, inst) 
            { 
                $(this).attr("disabled", false);
            },

            beforeShow: function(input, inst) 
            {
                $(this).attr("disabled", true);
            }
        });
        $('#ask-input-datePicker').datepicker( "setDate", this.date);
        $('#ask-input-datePicker').datepicker( "option", "minDate", new Date());
 	},

 	showResults:function(){
 		this.searchResultView = new SearchResultView("#ask-info", this.searchResult);
 	},

 	bindEvents:function(){
 		var self = this;

 		$('#info-cat').bind('click',function(){
 			app.navigate("",true);
 		});

		$('#ask-submit').bind('click',function(){
			var content = $('#ask-input-content').html();
			var gender = $('#ask-input-gender').html();
			var price = $('#ask-input-price').html();

 			self.registerView = new RegisterView(self.locationArray, self.date, self.date, content, gender, price);
 		}); 		

 	},

 	close:function(){
 		if (this.registerView){
 			this.registerView.close();
 		}

 		$('#info-cat').unbind();
 		$('#ask-submit').unbind();
        this.unbind();
        $(this.el).empty();

 	}




 });