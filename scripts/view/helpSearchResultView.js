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
        $(this.el).append("<div class='backgroundImage'></div>");
        $(this.el).append("<div id='help-full-width' class='full-width'></div>");
        $('#help-full-width').append("<div class='headerImage'></div>");
        $('#help-full-width').append("<div class='gradi'></div>");
        $('#help-full-width').append("<div id='help-upper-container' class='help-ask-upper-container'></div>");
        $('#help-upper-container').append("<div id='ask-header' class='help-ask-header'></div>");
        $('#ask-header').append("<div id='help-cat' class='help-ask-catContainer'></div>");
        $('#ask-header').append("<div id='help-title' class='help-ask-title'>创建您的点名需求</div>");
        $('#help-upper-container').append("<div id='help-createContainer' class='roundBox shadowBox help-ask-createContainer'></div>");
        $('#help-upper-container').append("<div class='help-ask-submit' ><a class='hxsbutton' id='help-submit'><span class='hxsbutton-text'>找人帮我</span><span class='hxsbutton-slide-text'>喵~翘咯~</span><span class='hxsbutton-icon-right'><span></span></span></a></div>");

        $('#help-createContainer').append("<div class='help-ask-row'><span style='float:left'>我在</span><div id='help-input-location' class='help-ask-input-location'></div></div>");
        $('#help-createContainer').append("<div class='help-ask-row'><span>附近求 </span><input id='help-input-content' placeholder='代点名'/></div>");
        $('#help-createContainer').append("<div class='help-ask-row'><span>这节课在 </span><input id='help-input-datePicker' class='help-ask-input-datePicker'/><span> 我需要一个</span></div>");
        $('#help-createContainer').append("<div class='help-ask-row'><select id='help-input-gender' class='help-ask-input-gender'><option value='2'>男生或女生</option><option value='0'>男生</option><option value='1'>女生</option></select><span> 这节课我愿意付 </span><input id='help-input-price' class='help-ask-input-price' type='number' placeholder='5'/><span> 元!</span></div>");

        $('#help-full-width').append("<div id='help-lower-container' class='help-ask-lower-container'></div>");
        $('#help-lower-container').append("<div id='help-lower-title' class='help-ask-lower-title'></div>");
        $('#help-lower-title').append("<div id='help-alternative-title' class='help-ask-alternative-title'>或者看这里</div>");
        $('#help-lower-title').append("<div id='help-gender-female' class='help-ask-gender'>只看女生</div>");
        $('#help-lower-title').append("<div id='help-gender-male' class='help-ask-gender'>只看男生</div>");
        $('#help-lower-title').append("<div id='help-gender-dontCare' class='help-ask-gender'>无所谓</div>");

        $('#help-lower-container').append("<div id='help-info' class='help-ask-secondaryContainer'></div>");


        var self = this;
        $('#help-input-datePicker').datepicker({
            onSelect: function(dateText, inst) { 
                //because IE and Safari does not support "yyyy mm dd"
                var dateTextArray = dateText.split("年");
                //update the system's jquery datepicker date
                self.date.setFullYear(dateTextArray[0]);
                var secondaryDateTextArray = dateTextArray[1].split("月");

                self.date.setMonth(secondaryDateTextArray[0]-1);
                var thirdDateTextArray = secondaryDateTextArray[1].split("日");

                self.date.setDate(thirdDateTextArray[0]);
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
        $('#help-input-datePicker').datepicker( "option", "minDate", app.minimumDate);
        $('#help-input-datePicker').datepicker( "option", "dateFormat", "yy年m月d日" );
        $('#help-input-datePicker').datepicker( "option", "numberOfMonths", 2);

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

        $('.help-ask-gender').css({'color' : ''});
        $('.help-ask-gender').css({'border-color' : 'transparent'});
        $('#help-gender-female').css({'color' : '#0099CC'});
        $('#help-gender-female').css({'border-color' : 'grey'});
    },

    showMale:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#help-info", this.searchResult, 0);

        $('.help-ask-gender').css({'color' : ''});
        $('.help-ask-gender').css({'border-color' : 'transparent'});
        $('#help-gender-male').css({'color' : '#0099CC'});
        $('#help-gender-male').css({'border-color' : 'grey'});
    },


    showDontCare:function(){
        if (this.searchResultView){
            this.searchResultView.close();
        }
        this.searchResultView = new SearchResultView("#help-info", this.searchResult, 2);

        $('.help-ask-gender').css({'color' : ''});
        $('.help-ask-gender').css({'border-color' : 'transparent'});
        $('#help-gender-dontCare').css({'color' : '#0099CC'});
        $('#help-gender-dontCare').css({'border-color' : 'grey'});
 	},

    bindEvents:function(){
        var self = this;

        $('#help-cat').bind('click',function(){
            app.navigate("",true);
        });

        $('.headerImage').bind('click',function(){
            app.navigate("",true);
        });

        $('#help-input-location').bind('click', this.showLocation);

        $('#help-submit').bind('click',function(){
            var proceed = true;
            var content = $('#help-input-content').val();
            var gender = $('#help-input-gender').val();
            var price = Number($('#help-input-price').val());
            if (!(typeof price == "number" && price > 0 && price % 1 === 0)){
                proceed = false;
                alert("请输入一个大于0的整数");
                // add more visual effects
            }
            if (typeof price == "number" && price > 999){
                proceed = false;
                alert("最多选¥999");
                // add more visual effects
            }
            if (content.length > 300){
                proceed = false;
                alert("内容最长300字");
            }
            if (modalOpen == false && proceed == true){
                self.registerView = new RegisterView(self.searchResult, self.locationArray, self.date, self.date, content, gender, price, 0);
            }
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
        $('.headerImage').unbind();

        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);

    }




 });