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

        if (this.type == 0){
            $('#detail-type').html("求点名");
        }
        else if (this.type == 1){
            $('#detail-type').html("帮点名");
        }


        $('#detail-location').html(this.message.get('location').school);
        var startDate = parseDate(this.message.get('startDate'));
        if (this.type == 0){
            $('#detail-date').html(this.getDateString(startDate));
            calander(startDate);
        }
        else if (this.type == 1){
            var endDate = parseDate(this.message.get('endDate'));
            $('#detail-date').html(this.getDateString(startDate) + " 到 " + this.getDateString(endDate));
            calander(startDate,endDate);
        }

        if (this.type == 1){
            $('#detail-totalPrice').html("&yen;" + this.message.get('price') + "/时");
        }
        if (this.type == 0){
            var hour = this.message.get('courseLengthInMinutes')/60;
            var hourPrice = this.message.get('price')/hour
            if (!(hour % 1 === 0)){
                hour = hour.toFixed(2)
            }
            if (!(hourPrice % 1 === 0)){
                hour = hour.toFixed(1)
            }
            $("#detail-dividedPrice").html(hour + "小时 / 单价" + hourPrice);
        }
        $('#detail-submit-passwordContainer').css({'visibility':'hidden'});
        $('#detail-submit-errorContainer').css({'visibility':'hidden'});

    },

    getDateString:function(date){
        return date.getFullYear() + "年" + (date.getMonth()+1) + "月" + date.getDate() + "日";
    },

    bindEvents:function(){
        var self = this;
        $('#detail-cat').bind('click',function(){
            app.navigate("",true);
        });

        var isSubmitClicked = false;
        $('#detail-submit-button').bind('click', function(){
            isSubmitClicked = true;
            $('#detail-submit-passwordContainer').css({'visibility':'visible'});
        });

        $('#detail-submitContainer').bind('click', function(){
            isSubmitClicked = true;
        });

        $('body').bind('click',function(){
            if(isSubmitClicked){ 
                isSubmitClicked = false;
            }else{
                $('#detail-submit-passwordContainer').css({'visibility':'hidden'});
                $('#detail-submit-errorContainer').css({'visibility':'hidden'});
            }
        });

        $('#detail-submit-password-button').bind('click',function(){
            self.authSubmit();
        }); 

    },

    authSubmit:function(){
        var password = $('#detail-submit-password').val();
        $('#detail-submit-password').val("");
        var self = this;
        self.message.overrideUrl(authUrlOverride);

        self.message.fetch({
            dataType:'json',

            data: $.param({ id: self.message.get('id'), password: password}),

            success:function(model, response){
                self.message.overrideUrl(infoUrlOverride);
                $('#detail-submit-passwordContainer').css({'visibility':'hidden'});
                $('#detail-submit-errorContainer').css({'visibility':'hidden'});
                self.messageEditView = new MessageEditView(self.message);
            },

            error: function(model, response){

                $('#detail-submit-errorContainer').css({'visibility':'visible'});
                $('#detail-submit-error').html("密码验证失败");
                /*target*/
                $('#detail-submit-password').value = "";
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
                $('#detail-submit-errorContainer').css({'visibility':'block'});
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
        $('#detail-submitContainer').unbind();
        $('body').unbind();
        $('#detail-submit-password-button').unbind();

        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);
    }





 });