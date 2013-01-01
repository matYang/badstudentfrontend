 var MessageDetailView= Backbone.View.extend({

 	el:$('body'),

 	initialize:function(message){
 		_.bindAll(this,'render','getDateString','bindEvents','authSubmit','close');
 		this.message = message;

        this.template = _.template(tpl.get('detailTemplate')),

        this.render();
        this.bindEvents();

 	},

    render: function(){
        $(this.el).append(this.template(this.message.toJSON()));
        this.type = this.message.get('type');


        $('#detail-location').html(this.message.get('location')[2]);
        var startDate = new Date(this.message.get('startDate'));
        if (this.type == 0){
            $('#detail-date').html(this.getDateString(startDate))
        }
        else if (this.type == 1){
            var endDate = new Date(this.message.get('endDate'));
            $('#detail-date').html(this.getDateString(startDate) + " 到 " + this.getDateString(endDate));
        }

        if (this.type == 1){
            $('#detail-totalPrice').html("&yen;" + this.message.get('price') + "/时");
        }
        if (this.type == 0){
            var hour = this.message.get('courseLengthInMinutes')/60;
            var hourPrice = this.message.get('price')/hour
            $("#detail-dividedPrice").html(hour + "小时 / 单价" + hourPrice);
        }
        

    },

    getDateString:function(date){
        return date.getFullYear() + "年" + (date.getMonth()+1) + "月" + date.getDate() + "日";
    },

    bindEvents:function(){
        var self = this;
        $('#detail-cat').bind('click',function(){
            app.navigate("",true);
        });

        $('#detail-submit-button').bind('click', function(){
            $('#detail-submit-passwordContainer').css({'display':'block'});
            
        });

        $('div').not('#detail-submitContainer, #detail-submit-button, #detail-submit-passwordContainer').bind('click',function(){

            $('#detail-submit-passwordContainer').css({'display':'none'});
            $('#detail-submit-errorContainer').css({'display':'none'});
        });

        $('#detail-submit-password-button').bind('click',function(){
            self.authSubmit();
        }); 

    },

    authSubmit:function(){
        var password = $('#detail-submit-password').val();
        var self = this;
        self.message.overrideUrl(authUrlOverride);

        self.message.fetch({
            dataType:'json',

            data: $.param({ id: self.message.get('id'), password: password}),

            success:function(model, response){
                self.message.overrideUrl(infoUrlOverride);
                self.messageEditView = new MessageEditView(self.message);
            },

            error: function(model, response){
                console.log("viewById::fetch failed");
                console.log(response);
                $('#detail-submit-errorContainer').css({'display':'block'});
                $('#detail-submit-error').html(textStatus);
            }
        });

        /*
        $.ajax({
            type: "GET",
            async: false,
            url: "http://localhost:8015/api/badstudent/v0.9/auth",
            dataType: 'json',
            data: {id : self.message.get('id'), password: password},

            success: function(data){
                data.set({'password': password});
                self.message = data;
                self.messageEditView = new MessageEditView(self.message);
                
            },
            error: function (data, textStatus, jqXHR){
                $('#detail-submit-errorContainer').css({'display':'block'});
                $('#detail-submit-error').html(textStatus);
            },
        });*/
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