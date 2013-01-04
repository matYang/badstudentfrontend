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
 		$(this.el).append("<div id='help-full-width' class='full-width'>");
 		$('#help-full-width').append("<div id='help-upper-container'></div>");
        $('#help-upper-container').append("<div id='header'></div>");
 		$('#header').append("<div id='help-title'>创建您的点名需求</div>");
 		$('#header').append("<div id='help-catContainer'><img id='help-cat' src='img/cat.png' alt='cat.png'/></div>");
 		$('#help-upper-container').append("<div id='help-createContainer' class='roundBox shadowBox'></div>");
 		$('#help-upper-container').append("<div id='help-submit' class='roundBox shadowBox'><div>我勒个去</div><img src='asset/submit.png' alt='submit.png'></div>");	

 		$('#help-createContainer').append("<div class='help-row'><p>我在</p><div id='help-input-location'></div>附近求</div>");
        $('#help-createContainer').append("<div class='help-row'><input id='help-input-content'/>，这</div>");
        $('#help-createContainer').append("<div class='help-row'>节课在 <input id='help-input-datePicker'/> 。我需要一个</div>");
        $('#help-createContainer').append("<div class='help-row'><select id='help-input-gender'><option value='2'>男生或女生</option><option value='0'>男生</option><option value='1'>女生</option></select>。 这节课我愿意付 <input id='help-input-price' type='number'/> 元!</div>");

 		$('#help-full-width').append("<div id='help-lower-container' class = 'lower-container'></div>");
        $('#help-lower-container').append("<div id='help-lower-title'></div>");
 		$('#help-lower-title').append("<div id='help-alternative-title'>或者看这里</div>");
 		$('#help-lower-title').append("<div id='help-gender-female'>只看女生</div>");
 		$('#help-lower-title').append("<div id='help-gender-male'>只看男生</div>");
 		$('#help-lower-title').append("<div id='help-gender-dontCare'>无所谓</div>");

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

        $('#help-lower-title div').css({'color' : ''});
        $('#help-gender-female').css({'color' : '#A0A0A0'});
    },

    showMale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#help-info", this.searchResult, 0);

        $('#help-lower-title div').css({'color' : ''});
        $('#help-gender-male').css({'color' : '#A0A0A0'});
    },


 	showDontCare:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
 		this.searchResultView = new SearchResultView("#help-info", this.searchResult, 2);

        $('#help-lower-title div').css({'color' : ''});
        $('#help-gender-dontCare').css({'color' : '#A0A0A0'});
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