 var HelpSearchResultView= Backbone.View.extend({

 	el:$('body'),

 	initialize:function(searchResult, date, locationArray){
 		_.bindAll(this,'render','showLocation', 'updateLocation','showFemale', 'showMale', 'showDontCare','bindEvents','close');

 		this.date = date;
        this.locationArray = locationArray;

 		this.searchResult = searchResult;
        this.render();
        this.updateLocation();	
        this.showDontCare();
        this.bindEvents();
 	},

 	render:function(){
 		$(this.el).append("<div id='help-full-width' class = 'full-width'>");
 		$('#help-full-width').append("<div id = 'help-upper-container' class = 'upper-container'></div>");
 		$('#help-upper-container').append("<div id = 'help-title'>创建您的点名需求</div>");
 		$('#help-upper-container').append("<div id = 'help-catContainer' class = 'catContainer'><img id = 'help-cat' class = 'cat' src = 'img/cat.png'/></div>");
 		$('#help-upper-container').append("<div id = 'help-createContainer' class = 'createContainer'></div>");
 		$('#help-upper-container').append("<div id = 'help-submit'>我勒个去<img id = 'help-submit-icon' src = 'img/submit.png'></div>");	

 		$('#help-createContainer').append("<p>我在 <div id = 'help-input-location' class = 'help-input-box'></div> 附近 求 <input id = 'help-input-content' class = 'help-input-box'/> ，这节课在 <input id = 'help-input-datePicker' class = 'help-input-box'/> 。我需要一个 <input id = 'help-input-gender' class = 'help-input-box' /> 这节课我愿意付 <input id = 'help-input-price' class = 'help-input-box' /> 元！</p>");

 		$('#help-full-width').append("<div id = 'help-lower-container' class = 'lower-container'></div>");
 		$('#help-lower-container').append("<div id = 'help-alternative-title' class = 'alternative-title'>或者看这里</div>");
 		$('#help-lower-container').append("<div id = 'help-genderContainer' class = 'genderContainer'></div>");
 		$('#help-genderContainer').append("<div id = 'help-gender-female' class = 'gender-selection'>只看女生</div>");
 		$('#help-genderContainer').append("<div id = 'help-gender-male' class = 'gender-selection'>只看男生</div>");
 		$('#help-genderContainer').append("<div id = 'help-gender-dontCare' class = 'gender-selection'>无所谓</div>");

 		$('#help-lower-container').append("<div id = 'help-info' class = 'secondaryContainer'></div>");


        var self = this;
 		$('#help-input-datePicker').datepicker({
            onSelect: function(dateText, inst) { 
                //update the system's jquery datepicker date
                var selectedDate = new Date(dateText);
                self.date.setDate(selectedDate.getDate());
                self.date.setMonth(selectedDate.getMonth());
                self.date.setFullYear(selectedDate.getFullYear());
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
        $('#help-input-datePicker').datepicker( "setDate", this.date);
        $('#help-input-datePicker').datepicker( "option", "minDate", new Date());
 	},

    showLocation:function(){
        if (modalOpen == false){
            this.locationPickView = new LocationPickView(this.locationArray, this); 
        }
    },

    updateLocation:function(){
        $('#help-input-location').html(this.locationArray[1] + " " + this.locationArray[2]);
    },

    showFemale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#help-info", this.searchResult, 1);

        $('#help-genderContainer .gender-selection').css({'background-color' : ''});
        $('#help-gender-female').css({'background-color' : '#A0A0A0'});
    },

    showMale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#help-info", this.searchResult, 0);

        $('#help-genderContainer .gender-selection').css({'background-color' : ''});
        $('#help-gender-male').css({'background-color' : '#A0A0A0'});
    },


 	showDontCare:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
 		this.searchResultView = new SearchResultView("#help-info", this.searchResult, 2);

        $('#help-genderContainer .gender-selection').css({'background-color' : ''});
        $('#help-gender-dontCare').css({'background-color' : '#A0A0A0'});
 	},

 	bindEvents:function(){
 		var self = this;

 		$('#help-cat').bind('click',function(){
 			app.navigate("",true);
 		});

        $('#help-input-location').bind('click', this.showLocation);

		$('#help-submit').bind('click',function(){
			var content = $('#help-input-content').val();
			var gender = $('#help-input-gender').val();
			var price = $('#help-input-price').val();

 			self.registerView = new RegisterView(self.searchResult, self.locationArray, self.date, self.date, content, gender, price, 0);
 		});

        $('#help-gender-female').bind('click', this.showFemale);
        $('#help-gender-male').bind('click', this.showMale);
        $('#help-gender-dontCare').bind('click', this.showDontCare);

 	},

 	close:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
 		if (this.registerView){
 			this.registerView.close();
 		}
        var datePickerDiv = $('#ui-datepicker-div');        //reserve the datepicker div

 		$('#help-cat').unbind();
        $('#help-input-location').unbind();
 		$('#help-submit').unbind();
        $('#help-gender-female').unbind();
        $('#help-gender-male').unbind();
        $('#help-gender-dontCare').unbind();

        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);

 	}




 });