 var AskSearchResultView= Backbone.View.extend({

    el:$('body'),

    initialize:function(searchResult, date, locationArray){
        _.bindAll(this,'render','showLocation', 'updateLocation','showFemale', 'showMale', 'showDontCare','bindEvents','close');

        this.date = date;
        this.startDate = new Date();
        this.endDate = new Date();
        this.locationArray = locationArray;

        this.searchResult = searchResult;
        this.render();
        this.updateLocation();  
        this.showDontCare();
        this.bindEvents();
    },

    render:function(){
        $(this.el).append("<div id='ask-full-width' class = 'full-width'>");
        $('#ask-full-width').append("<div id = 'ask-upper-container' class = 'upper-container'></div>");
        $('#ask-upper-container').append("<div id = 'ask-title'>创建您的点名需求</div>");
        $('#ask-upper-container').append("<div id = 'ask-catContainer' class = 'catContainer'><img id = 'ask-cat' class = 'cat' src = 'img/cat.png'/></div>");
        $('#ask-upper-container').append("<div id = 'ask-createContainer' class = 'createContainer'></div>");
        $('#ask-upper-container').append("<div id = 'ask-submit'>我勒个去<img id = 'ask-submit-icon' src = 'img/submit.png'></div>");   

        $('#ask-createContainer').append("<p>我在 <div id = 'ask-input-location' class = 'ask-input-box'></div> 附近 求 <input id = 'ask-input-startDatePicker' class = 'ask-input-box'/> ，这节课在 <input id = 'ask-input-endDatePicker' class = 'ask-input-box'/> 。我是一个 <input id = 'ask-input-gender' class = 'ask-input-box' /> 我希望收取 <input id = 'ask-input-price' class = 'ask-input-box' /> 元每小时！</p>");

        $('#ask-full-width').append("<div id = 'ask-lower-container' class = 'lower-container'></div>");
        $('#ask-lower-container').append("<div id = 'ask-alternative-title' class = 'alternative-title'>或者看这里</div>");
        $('#ask-lower-container').append("<div id = 'ask-genderContainer' class = 'genderContainer'></div>");
        $('#ask-genderContainer').append("<div id = 'ask-gender-female' class = 'gender-selection'>只看女生</div>");
        $('#ask-genderContainer').append("<div id = 'ask-gender-male' class = 'gender-selection'>只看男生</div>");
        $('#ask-genderContainer').append("<div id = 'ask-gender-dontCare' class = 'gender-selection'>无所谓</div>");

        $('#ask-lower-container').append("<div id = 'ask-info' class = 'secondaryContainer'></div>");


        var self = this;
        $('#ask-input-startDatePicker').datepicker({
            onSelect: function(dateText, inst) { 
                self.startDate = new Date(dateText);

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
        $('#ask-input-startDatePicker').datepicker( "setDate", this.date);
        $('#ask-input-startDatePicker').datepicker( "option", "minDate", new Date());


        $('#ask-input-endDatePicker').datepicker({
            onSelect: function(dateText, inst) { 
                self.endDate = new Date(dateText);
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
        $('#ask-input-endDatePicker').datepicker( "setDate", this.date);
        $('#ask-input-endDatePicker').datepicker( "option", "minDate", new Date());
    },

    showLocation:function(){
        if (modalOpen == false){
            this.locationPickView = new LocationPickView(this.locationArray, this); 
        }
    },

    updateLocation:function(){
        $('#ask-input-location').html(this.locationArray[1] + " " + this.locationArray[2]);
    },

    showFemale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#ask-info", this.searchResult, 1);

        $('#ask-genderContainer .gender-selection').css({'background-color': ''});
        $('#ask-gender-female').css({'background-color' : '#A0A0A0'});
    },

    showMale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#ask-info", this.searchResult, 0);

        $('#ask-genderContainer .gender-selection').css({'background-color': ''});
        $('#ask-gender-male').css({'background-color' : '#A0A0A0'});
    },


    showDontCare:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#ask-info", this.searchResult, 2);

        $('#ask-genderContainer .gender-selection').css({'background-color': ''});
        $('#ask-gender-dontCare').css({'background-color' : '#A0A0A0'});
    },

    bindEvents:function(){
        var self = this;

        $('#ask-cat').bind('click',function(){
            app.navigate("",true);
        });

        $('#ask-input-location').bind('click', this.showLocation);

        $('#ask-submit').bind('click',function(){
            var content = "我要帮人点名";
            var gender = $('#ask-input-gender').val();
            var price = $('#ask-input-price').val();

            self.registerView = new RegisterView(self.searchResult, self.locationArray, self.startDate, self.endDate, content, gender, price, 1);
        });

        $('#ask-gender-female').bind('click', this.showFemale);
        $('#ask-gender-male').bind('click', this.showMale);
        $('#ask-gender-dontCare').bind('click', this.showDontCare);

    },

    close:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        if (this.registerView){
            this.registerView.close();
        }
        var datePickerDiv = $('#ui-datepicker-div');        //reserve the datepicker div

        $('#ask-cat').unbind();
        $('#ask-input-location').unbind();
        $('#ask-submit').unbind();
        $('#ask-gender-female').unbind();
        $('#ask-gender-male').unbind();
        $('#ask-gender-dontCare').unbind();

        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);

    }




 });