 var MessageDetailView= Backbone.View.extend({

 	el:$('body'),

 	initialize:function(message){
 		_.bindAll(this,'render','getDateString','bindEvents','close');
 		this.message = message;

        this.template = _.template(tpl.get('detailTemplate')),

        this.render();
        this.bindEvents();

 	},

    render: function(){
        $(this.targetId).append(this.template(this.message.toJSON()));
        this.type = this.message.get('type');


        $('#detail-location').html(this.message.get('location')[2]);
        var startDate = this.message.get('startDate');
        if (this.type == 0){
            $('#detail-date').html(this.getDateString(startDate))
        }
        else if (this.type == 1){
            var endDate = this.message.get('endDate');
            $('#detail-date').html(this.getDateString(startDate) + " 到 " + this.getDateString(endDate));
        }

        if (this.type == 1){
            $('#detail-totalPrice').html(this.message.get('price') + "/时");
        }
        if (this.type == 0){
            var hour = this.messahe.get('courseLengthInMinutes')/60;
            var hourPrice = this.message.get('price')/hour
            $("#detail-dividedPrice").html(hour + "小时 / 单价" + hourPrice);
        }
        

    },

    getDateString:function(date){
        return date.getFullYear() + "年" ＋ （date.getMonth()+1） + "月" + date.getDate() + "日";
    },

    bindEvents:function(){
        $('#detail-cat').bind('click',function(){
            app.navigate("",true);
        });

        $('#detail-submit-button').bind('click', function(){
            $('#detail-submit-passwordContainer').css({'display':'block'});
            $('#detail-full-width:not(detail-submitContainer)').bind('click',function(){

                $('#detail-submit-passwordContainer').css({'display':'none'});
                $('#detail-submit-errorContainer').css({'display':'none'});

                $('#detail-full-width:not(detail-submitContainer)').unbind();
            });
        });

        $('#detail-submit-password-button').bind('click', this.authSubmit);


    },

    authSubmit:function(){
        var password = $('#detail-submit-password').val();
        var self = this;
        $.ajax({
            type: "GET",
            async: false,
            url: "http://localhost:8015/api/badstudent/v0.9/auth",
            dataType: 'json',
            data: {id : self.message.get('id'), password: password},

            success: function(data){
                var password = date;
                self.message.set({'password': password});
                this.messageEditView = new MessageEditView(self.message);
                
            },
            error: function (data, textStatus, jqXHR){
                $('#detail-submit-errorContainer').css({'display':'block'});
                $('#detail-submit-error').html(textStatus);
            },
        });
    },

    close:function(){
        if (this.messageEditView){
            this.messageEditView.close();
        }

        var datePickerDiv = $('#ui-datepicker-div');        //reserve the datepicker div

        $('#detail-cat').unbind();
        $('#detail-submit-button').unbind();
        $('#detail-full-width:not(detail-submitContainer)').unbind();
        $('#detail-submit-password-button').unbind();

        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);
    }





 });