 var MainPageView = Backbone.View.extend({

 	el: $('body'),

 	events: {


 	},

 	initialize:function(){
 		_.bindAll(this, 'getRecents','render','showLocation', 'close');
        this.date = new Date();
        this.locationArray = new Array("江苏省", "南京市", "南京大学");

 		this.getRecents();
        this.render();
 	},

 	getRecents: function(){
 		this.recentsResults = new Messages(recentsUrlOverride);
        var self = this;
        this.recentsResults.fetch({

        	dataType:'json',

            success:function (model, response) {
                self.searchResultView = new SearchResultView("#main-info", self.recentsResults);
                console.log("recents fetch successed: " + response);
            },

            error:function (response){
            	alert("model fetch failure, current URL:" + self.recentsResults.url);
            	console.log("recents fetch failed: " + response);
            },

        });
 	},

 	render:function(){

        $('#main-input-city').html(this.locationArray[1]);
        $('#main-input-university').html(this.locationArray[2]);

        var self = this;
        $('#main-input-city').bind('click', self.showLocation());
        $('#main-input-university').bind('click', self.showLocation());


 		$('#datePicker').datepicker({
            onSelect: function(dateText, inst) { 
                this.date = new Date(dateText);
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

        $('#datePicker').datepicker( "setDate", new Date());
        $('#datePicker').datepicker( "option", "minDate", new Date());
        $('#datePicker').datepicker($.datepicker.regional["ch-ZN"]);
 	},

    showLocation:function(){
        this.locationPickView = new LocationPickView(this.locationArray);
    },

    close:function(){
        $('#main-input-city').unbind();
        $('#main-input-university').unbind();
        this.unbind();
        this.remove();
        $('body').empty();
    },


 });