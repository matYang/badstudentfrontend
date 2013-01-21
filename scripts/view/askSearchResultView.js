 var AskSearchResultView= Backbone.View.extend({

    el:$('body'),

    initialize:function(searchResult, date, locationArray){
        _.bindAll(this,'render','showLocation', 'updateLocation','showFemale', 'showMale', 'showDontCare','bindEvents','close');

        this.date = date;
        this.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        this.endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0,0,0);
        this.locationArray = locationArray;

        this.searchResult = searchResult;
        this.render();
        this.updateLocation();  
        this.showDontCare();
        this.bindEvents();
    },

    render:function(){
        $(this.el).append("<div id='ask-full-width' class='full-width'>");
        $('#ask-full-width').append("<img class='backgroundImage' src='asset/chinamap.png' alt='chinamap.png'>");
        $('#ask-full-width').append("<div id='ask-upper-container' class='help-ask-upper-container'></div>");
        $('#ask-upper-container').append("<div id='help-header' class='help-ask-header'></div>");
        $('#help-header').append("<div id='ask-title' class='help-ask-title'>创建您的点名需求</div>");
        $('#help-header').append("<div id='ask-catContainer' class='help-ask-catContainer'><img id='ask-cat' src='img/cat.png'/></div>");
        $('#ask-upper-container').append("<div id='ask-createContainer' class='roundBox shadowBox help-ask-createContainer'></div>");
        $('#ask-upper-container').append("<div id='ask-submit' class='roundBox shadowBox help-ask-submit'><div>我勒个去</div><img src='asset/pencil.png' alt='铅笔.png'></div>");   

        $('#ask-createContainer').append("<div class='help-ask-row'><p>我能在</p><div id='ask-input-location' class='help-ask-input-location'></div>附近帮</div>");
        $('#ask-createContainer').append("<div class='help-ask-row'>点名，我从<input id='ask-input-startDatePicker' class='help-ask-input-datePicker'/>到</div>");
        $('#ask-createContainer').append("<div class='help-ask-row'><input id='ask-input-endDatePicker' class='help-ask-input-datePicker'/> 我是一个<select id='ask-input-gender' class='help-ask-input-gender'><option value='0'>男生</option><option value='1'>女生</option></select></div>");
        $('#ask-createContainer').append("<div class='help-ask-row'>我希望收取<input id='ask-input-price' class='help-ask-input-price' type='number' placeholder='5'/>元每小时!</div>");

        $('#ask-full-width').append("<div id='ask-lower-container' class='help-ask-lower-container'></div>");
        $('#ask-lower-container').append("<div id='ask-lower-title' class='help-ask-lower-title'></div>");
        $('#ask-lower-title').append("<div id='ask-alternative-title' class='help-ask-alternative-title'>或者看这里</div>");
        $('#ask-lower-title').append("<div id='ask-gender-female' class='help-ask-gender'>只看女生</div>");
        $('#ask-lower-title').append("<div id='ask-gender-male' class='help-ask-gender'>只看男生</div>");
        $('#ask-lower-title').append("<div id='ask-gender-dontCare' class='help-ask-gender'>无所谓</div>");
        $('#ask-lower-container').append("<div id='ask-info' class = 'help-ask-secondaryContainer'></div>");


        var self = this;
        $('#ask-input-startDatePicker').datepicker({
            onSelect: function(dateText, inst) { 
                                //because IE and Safari does not support "yyyy mm dd"
                var dateTextArray = dateText.split("年");
                //update the system's jquery datepicker date
                self.date.setFullYear(dateTextArray[0]);
                var secondaryDateTextArray = dateTextArray[1].split("月");

                self.date.setMonth(secondaryDateTextArray[0]-1);
                var thirdDateTextArray = secondaryDateTextArray[1].split("日");

                self.date.setDate(thirdDateTextArray[0]);


                self.startDate = new Date(dateTextArray[0], secondaryDateTextArray[0]-1, thirdDateTextArray[0], 0 , 0, 0, 0);
                if (!(self.startDate < self.endDate)){   //if start date is greater than end date
                    $('#ask-input-endDatePicker').datepicker( "setDate", self.date);
                    self.endDate.setFullYear(self.startDate.getFullYear());
                    self.endDate.setMonth(self.startDate.getMonth());
                    self.endDate.setDate(self.startDate.getDate());
                }
                $('#ask-input-endDatePicker').datepicker( "option", "minDate", self.date);
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
        $('#ask-input-startDatePicker').datepicker( "option", "dateFormat", "yy年m月d日");


        $('#ask-input-endDatePicker').datepicker({
            onSelect: function(dateText, inst) { 
                //because IE and Safari does not support "yyyy mm dd"
                var dateTextArray = dateText.split("年");
                //update the system's jquery datepicker date
                var secondaryDateTextArray = dateTextArray[1].split("月");
                var thirdDateTextArray = secondaryDateTextArray[1].split("日");

                self.endDate = new Date(dateTextArray[0], secondaryDateTextArray[0]-1, thirdDateTextArray[0], 0, 0, 0, 0);
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
        $('#ask-input-endDatePicker').datepicker( "option", "dateFormat", "yy年m月d日");
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

        $('.help-ask-gender').css({'color' : ''});
        $('#ask-gender-female').css({'color' : '#A0A0A0'});
    },

    showMale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#ask-info", this.searchResult, 0);

        $('.help-ask-gender').css({'color' : ''});
        $('#ask-gender-male').css({'color' : '#A0A0A0'});
    },


    showDontCare:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#ask-info", this.searchResult, 2);

        $('.help-ask-gender').css({'color' : ''});
        $('#ask-gender-dontCare').css({'color' : '#A0A0A0'});
    },

    bindEvents:function(){
        var self = this;

        $('#ask-cat').bind('click',function(){
            app.navigate("",true);
        });

        $('#ask-input-location').bind('click', this.showLocation);

        $('#ask-submit').bind('click',function(){
            var proceed = true;
            var content = "我要帮人点名";
            var gender = $('#ask-input-gender').val();
            var price = Number($('#ask-input-price').val());
            if (!(typeof price == "number" && price > 0 && price % 1 === 0)){
                proceed = false;
                alert("please enter a valid price");
                // add more visual effects
            }
            if (typeof price == "number" && price > 1000){
                proceed = false;
                alert("最多选¥1000");
                // add more visual effects
            }
            if (modalOpen == false && proceed == true){
                self.registerView = new RegisterView(self.searchResult, self.locationArray, self.startDate, self.endDate, content, gender, price, 1);
            }
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