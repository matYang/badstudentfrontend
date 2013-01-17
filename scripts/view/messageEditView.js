 var MessageEditView= Backbone.View.extend({


 	initialize:function(message){
 		_.bindAll(this,'render','showLocation','validation','updateLocation','bindEvents','updateMessage','close');
 		this.message = message;

        this.startDate = parseDate(this.message.get('startDate'));
        this.endDate = parseDate(this.message.get('endDate'));
        this.locationArray = new Array();
        this.locationArray[0] = this.message.get('location').province;
        this.locationArray[1] = this.message.get('location').city;
        this.locationArray[2] = this.message.get('location').school;
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
        $('#detail-modal-datePicker').datepicker({
            onSelect: function(dateText, inst) { 
                //because IE and Safari does not support "yyyy mm dd"
                var dateTextArray = dateText.split(" ");
                self.startDate = new Date(dateTextArray[0], dateTextArray[1]-1, dateTextArray[2]);

                if (true){    //if start date is greate than end date
                    $('#detail-modal-endDatePicker').datepicker( "setDate", self.startDate);
                }
                $('#detail-modal-endDatePicker').datepicker( "option", "minDate", self.startDate);
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
        $('#detail-modal-datePicker').datepicker( "setDate", this.startDate);
        $('#detail-modal-datePicker').datepicker( "option", "minDate", new Date());





        if (this.type == 0){
            $('#detail-modal-upperRightContainer').append("<div id = 'detail-modal-courseLengthInMinutesContainer' class = 'edit-line'><div class='edit-line-label'>课时</div><input id = 'detail-modal-courseLengthInMinutes' value = '" + this.message.get('courseLengthInMinutes') + "'/></div>");
        }
        if (this.type == 1){
            $('#detail-modal-upperRightContainer').append("<div id = 'detail-modal-endDatePickerContainer' class='edit-line'><div class='edit-line-label'>到</div><input id = 'detail-modal-endDatePicker'/></div>");
            $('#detail-modal-endDatePicker').datepicker({
            onSelect: function(dateText, inst) { 
                var dateTextArray = dateText.split(" ");
                self.endDate = new Date(dateTextArray[0], dateTextArray[1]-1, dateTextArray[2]);
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
        $('#detail-modal-endDatePicker').datepicker( "setDate", this.endDate);
        $('#detail-modal-endDatePicker').datepicker( "option", "minDate", new Date());
        }

        togglePopup('editPanel');

    },

    showLocation:function(){
        if (doubleModalOpen == false ){
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

        var self = this;
        $('#detail-modal-closeButton').bind('click',this.close);
        $('#detail-modal-deleteButton').bind('click',function(){
            self.deleteMessage();
        });
        $('#detail-modal-submitButton').bind('click',this.validation);

    },

    deleteMessage:function(){
        var self = this;
        this.message.destroy({  

            dataType:'json',

            headers: {
                'authCode':self.message.get('authCode'),
            },

            success:function(){
                var encodedSearchKey = encodeURI(self.message.get('email') + "-" + self.message.get('phone') + "-" + self.message.get('qq') +  "-" + self.message.get('twitter') + "-" + self.message.get('selfDefined'));
                app.navigate("info/" + encodedSearchKey, true);
            },
            
            error: function(){

                alert("deleteFailed");
            }
        
        });

    },

    validation:function(){
        var proceed = true;

        this.email = $('#detail-modal-email').val();
        this.phone = $('#detail-modal-phone').val();
        this.qq = $('#detail-modal-qq').val();
        this.twitter = $('#detail-modal-twitter').val();
        this.selfDefined = $('#detail-modal-selfDefined').val();
        this.content = $('#detail-modal-content').val();
        this.price = $('#detail-modal-price').val();

        if (!(this.email || this.phone || this.qq || this.twitter || this.selfDefined)){
            proceed = false;
            alert("please enter at least one entry of contact info");
        }
        /*target*/
        if ((this.price)){

        }

        this.updateMessage();
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
            this.courseLengthInMinutes = $('#detail-modal-courseLengthInMinutes').val();
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

                app.navigate("tempSession/" + encodeURI(self.message.get('id')), true);
            },
            
            error: function(){

                alert("PUT Error: check server configuration");
            }
        });

    },

    close:function(){
        togglePopup('editPanel');
        $("#detail-modal-datePicker").datepicker("destroy");
        $('#detail-modal-datePicker').unbind();
        $("#detail-modal-endDatePicker").datepicker("destroy");
        $('#detail-modal-endDatePicker').unbind();

        $('#detail-modal-city').unbind();
        $('#detail-modal-university').unbind();
        $('#detail-modal-closeButton').unbind();
        $('#detail-modal-deleteButton').unbind();
        $('#detail-modal-submitButton').unbind();
        $('#editPanel').remove();
        this.unbind();

        modalOpen = false;

        Backbone.View.prototype.remove.call(this);

    }



 });