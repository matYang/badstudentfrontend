 var MainPageView = Backbone.View.extend({

 	el: $('body'),

 	events: {


 	},

 	initialize:function(date, locationArray){
 		_.bindAll(this, 'getRecents','render','showLocation', 'updateLocation' ,'bindRoutes', 'getTrigger','close');
        
        this.template = _.template(tpl.get('indexTemplate')),

        this.date = date;
        this.locationArray = locationArray;

        this.render();
        this.updateLocation();
        this.bindRoutes();
 		this.getRecents();
        
 	},

 	getRecents: function(){

 		this.recentsResults = new Messages(recentsUrlOverride);
        var self = this;
        this.recentsResults.fetch({

        	dataType:'json',

            success:function (model, response) {
                self.searchResultView = new SearchResultView("#main-info", self.recentsResults, 2);

            },

            error:function (response){
            	alert("model fetch failure, current URL:" + self.recentsResults.url);

            },

        });
 	},

 	render:function(){
        $(this.el).append(this.template);

        var self = this;

 		$('#datePicker').datepicker({
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

        $('#datePicker').datepicker( "setDate", this.date);
        $('#datePicker').datepicker( "option", "minDate", new Date());
        $('#datePicker').datepicker( "option", "dateFormat", "yy年m月d日" );
 	},

    showLocation:function(){
        if (modalOpen == false){
            this.locationPickView = new LocationPickView(this.locationArray, this); 
        }
             
    },

    updateLocation:function(){
        $('#main-input-city').html(this.locationArray[1]);
        $('#main-input-university').html(this.locationArray[2]);
    },

    bindRoutes:function(){
        var self = this;

        $('#main-input-city').bind('click', this.showLocation);
        $('#main-input-university').bind('click', this.showLocation);
        
        $('#main-help-me-find').bind('click', function(){
            var encodedSearchKey = encodeURI(self.locationArray[0] + "-" + self.locationArray[1] + "-" + self.locationArray[2] +  "-" + self.date.getFullYear() + "-" + (self.date.getMonth()+1) + "-" + self.date.getDate());
            //var trigger = self.getTrigger();
            app.navigate("help/" + encodedSearchKey,true);
        });

        $('#main-help-others').bind('click', function(){
            var encodedSearchKey = encodeURI(self.locationArray[0] + "-" + self.locationArray[1] + "-" + self.locationArray[2] +  "-" + self.date.getFullYear() + "-" + (self.date.getMonth()+1) + "-" + self.date.getDate());
            //var trigger = self.getTrigger();
            app.navigate("ask/" + encodedSearchKey,true);
        });

        $('#main-info-search').bind('click', function(){
            if (modalOpen == false){
                self.enterInfoSearchView = new EnterInfoSearchView();
            }
            
        });        
    },

    getTrigger:function(){
        if (browserInfo.safari == true){
            return false;
        }
        else{
            return true;
        }
    },

    close:function(){
        if (this.locationPickView){
            this.locationPickView.close();
        }
        if (this.enterInfoSearchView){
            this.enterInfoSearchView.close();
        }
        var datePickerDiv = $('#ui-datepicker-div');        //reserve the datepicker div

        $("#datepicker").datepicker("destroy");
        $('#datePicker').unbind();
        $('#main-input-city').unbind();
        $('#main-input-university').unbind();
        $('#main-help-me-find').unbind();
        $('#main-help-others').unbind();
        $('#main-info-search').unbind();
        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);                   //inject into dom for future uses

        //Backbone.View.prototype.remove.call(this);
    }


 });