 var MessageEditView= Backbone.View.extend({


 	initialize:function(message){
 		_.bindAll(this,'render','showLocation','updateLocation','bindEvents','updateMessage','close');
 		this.message = message;

        this.startDate = new Date(this.message.get('startDate'));
        this.endDate = new Date(this.message.get('endDate'));
        this.locationArray = new Array();
        this.locationArray[0] = this.message.get('location')[0];
        this.locationArray[1] = this.message.get('location')[1];
        this.locationArray[2] = this.message.get('location')[2];
        this.type = this.message.get('type');

        modalOpen = true;

        this.template = _.template(tpl.get('editTemplate')),

        this.render();
        this.bindEvents();
        this.updateLocation();
 	},

    render: function(){
        $('body').append(this.template(this.message.toJSON()));

        var self = this;
        $('#detail-modal-datePickerContainer').datepicker({
            onSelect: function(dateText, inst) { 
                self.startDate = new Date(dateText);
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
        $('#detail-modal-datePickerContainer').datepicker( "setDate", this.startDate);
        $('#detail-modal-datePickerContainer').datepicker( "option", "minDate", new Date());



        if (this.type == 0){
            $('#detail-modal-courseLengthInMinutesContainer').css({'display':'block'});
        }
        if (this.type == 1){
            $('#detail-modal-endDatePickerContainer').css({'display':'block'});
            $('#detail-modal-endDatePickerContainer').datepicker({
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
        $('#detail-modal-endDatePickerContainer').datepicker( "setDate", this.endDate);
        $('#detail-modal-endDatePickerContainer').datepicker( "option", "minDate", new Date());
        }

    },

    showLocation:function(){
        if (modalOpen == false ){
            this.locationPickView = new LocationPickView(this.locationArray, this);
        }
    },

    updateLocation:function(){
        $('#detail-modal-city').html(this.locationArray[1]);
        $('#detail-modal-university').html(this.locationArray[2]);
    },


    bindEvents:function(){ 
        $('#detail-modal-city').bind('click', this.showLocation);
        $('#detail-modal-university').bind('click', this.showLocation);

        $('#detail-modal-mask').bind('click',this.close);
        $('#detail-modal-deleteButton').bind('click',this.deleteMessage);
        $('#detail-modal-submitButton').bind('click',this.updateMessage);

    },

    deleteMessage:function(){
        var self = this;
        this.message.destroy({
            success:function(){
                var encodedSearchKey = self.message.get('email') + "-" + self.message.get('phone') + "-" + self.message.get('qq') +  "-" + self.message.get('twitter') + "-" + self.message.get('selfDefined');
                app.navigate('info/*encodedSearchKey', true);
            },
            
            error: function(){
                console.log("delete failed");
                alert("deleteFailed");
            }
        
        });

    },

    updateMessage:function(){
        var self = this;

        this.email = $('#detail-modal-email').val();
        this.phone = $('#detail-modal-phone').val();
        this.qq = $('#detail-modal-qq').val();
        this.twitter = $('#detail-modal-twitter').val();
        this.selfDefined = $('#detail-modal-selfDefined').val();
        this.content = $('#detail-modal-content').val();
        this.price = $('#detail-modal-price').val();

        if (this.type == 0){
            this.courseLengthInMinutes = $('#detail-modal-courseLengthInMinutesContainer').val();
            this.endDate = this.startDate;
        }
        else if (this.type == 1){
            this.courseLengthInMinutes = this.message.get('courseLengthInMinutes');
        }

        var locationString = this.locationArray[0] + " " + this.locationArray[1] + " " + this.locationArray[2];
        var startDateString = this.startDate.getFullYear() + " " + (this.startDate.getMonth()+1) + " " + this.startDate.getDate();
        var endDateString = this.endDate.getFullYear() + " " + (this.endDate.getMonth()+1) + " " + this.endDate.getDate();

        this.message.set({'startDate' : startDateString, 'endDate' : endDateString,
        'location' : locationString, 'content' : this.content,
        'email' : this.email, 'phone' : this.phone, 'qq' : this.qq, 'twitter' : this.twitter, 'selfDefined' : this.selfDefined,
        'price' : this.price, "courseLengthInMinutes" : this.courseLengthInMinutes});

        this.message.save({},{
            success:function(model, response){
                console.log("PUT succeeded");
                console.log(model.get('id'));
                app.navigate("message/" + this.message.get('id'), true);
            },
            
            error: function(){
                console.log("PUT failed");
                alert("PUT Error: check server configuration");
            }
        });

    },

    close:function(){

        $('#detail-modal-city').unbind();
        $('#detail-modal-university').unbind();
        $('#detail-modal-closeButton').unbind();
        $('#detail-modal-deleteButton').unbind();
        $('#detail-modal-submitButton').unbind();
        $('#detail-modal-main').remove();
        this.unbind();

        modalOpen = false;

        Backbone.View.prototype.remove.call(this);

    }



 });