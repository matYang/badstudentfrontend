 var MessageEditView= Backbone.View.extend({


 	initialize:function(message){
 		_.bindAll(this,'render','getDateString','bindEvents','close');
 		this.message = message;

        this.startDate = new Date(this.message.get('startDate'));
        this.endDate = new Date(this.message.get('endDate'));
        this.locationArray = new Array();
        this.locationArray[0] = this.message.get('location')[0];
        this.locationArray[1] = this.message.get('location')[1];
        this.locationArray[2] = this.message.get('location')[2];

        this.template = _.template(tpl.get('editTemplate')),

        this.render();
        this.bindEvents();
 	},

    render: function(){
        $(this.targetId).append(this.template(this.message.toJSON()));
        this.type = this.message.get('type');

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



        if (type == 0){
            $('#detail-modal-courseLengthInMinutesContainer').css({'display':'block'});
        }
        if (type == 1){
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
        
        $('#detail-modal-city').html(this.locationArray[1]);
        $('#detail-modal-university').html(this.locationArray[2]);

        

    },

    bindEvents:function(){

        $('#detail-modal-deleteButton').bind('click'， this.deleteMessage);
        $('#detail-modal-submitButton').bind('click'， this.updateMessage);

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
        thisMessage.save({},{
            success:function(model, response){
                console.log("PUT succeeded");
                console.log(model.get('id'));
                alert("PUT Success: congradualations");
            },
            
            error: function(){
                console.log("PUT failed");
                alert("PUT Error: check server configuration");
            }
        });

    },





 });