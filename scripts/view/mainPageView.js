 var MainPageView = Backbone.View.extend({

 	el: $('body'),

 	events: {


 	},

 	initialize:function(){
 		_.bindAll(this, 'getRecents','render','showLocation', 'bindRoutes','close');
        this.date = new Date();
        this.locationArray = new Array("江苏省", "南京市", "南京大学仙林校区");

        this.bindRoutes();
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
 	},

    showLocation:function(){
        if (modalOpen == false){
            this.locationPickView = new LocationPickView(this.locationArray); 
        }
             
    },

    bindRoutes:function(){
        var self = this;

        $('#main-input-city').bind('click', this.showLocation);
        $('#main-input-university').bind('click', this.showLocation);
        
        $('#main-help-me-find').bind('click', function(){
            var encodedSearchKey = self.locationArray[0] + "-" + self.locationArray[1] + "-" + self.locationArray[2] +  "-" + self.date.getFullYear() + "-" + (self.date.getMonth()+1) + "-" + self.date.getDate();
            app.navigate("help/" + encodedSearchKey,true);
        });

        $('#main-help-others').bind('click', function(){
            var encodedSearchKey = self.locationArray[0] + "-" + self.locationArray[1] + "-" + selfs.locationArray[2] +  "-" + self.date.getFullYear() + "-" + (self.date.getMonth()+1) + "-" + self.date.getDate();
            app.navigate("ask/" + encodedSearchKey,true);
        });

        $('#main-info-search').bind('click', function(){
            if (modalOpen == false){
                self.enterInfoSearchView = new EnterInfoSearchView();
            }
            
        });        
    },

    close:function(){
        if (this.locationPickView){
            this.locationPickView.close();
        }
        if (this.enterInfoSearchView){
            this.enterInfoSearchView.close();
        }
        $('#main-input-city').unbind();
        $('#main-input-university').unbind();
        $('#main-help-me-find').unbind();
        $('#main-help-others').unbind();
        $('#main-info-search').unbind();
        this.unbind();
        this.remove();

        Backbone.View.prototype.remove.call(this);
    },


 });