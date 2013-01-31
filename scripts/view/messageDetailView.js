 var MessageDetailView= Backbone.View.extend({

 	el:$('body'),

 	initialize:function(message){
 		_.bindAll(this,'render','getDateString','bindEvents','validation','authSubmit','close');
 		this.message = message;

        if (this.message.get('authCode') == -2){
            alert("这个消息已经过期或被创建者删除");
            app.navigate("",true);
        }
        else{
            this.template = _.template(tpl.get('detailTemplate')),

            this.render();
            this.bindEvents();
        }
        this.allowPassword = true;


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
            if (this.message.get('startDate') == this.message.get('endDate')){
                 $('#detail-date').html(this.getDateString(startDate));
            }
            else{
                var endDate = parseDate(this.message.get('endDate'));
                $('#detail-date').html(this.getDateString(startDate) + " 到 " + this.getDateString(endDate));
            }
            calander(startDate,endDate);
        }
        else{
            alert("invalid message type");
        }

        if (this.type == 1){
            $('#detail-totalPrice').html("&yen;" + this.message.get('price') + "<span>/时</span>");
        }
        if (this.type == 0){
            var hour = Number(this.message.get('courseLengthInMinutes')/60);
            var hourPrice = Number(this.message.get('price')/hour);
            if (!(hour % 1 === 0)){
                hour = hour.toFixed(2);
            }
            if (!(hourPrice % 1 === 0)){
                hourPrice = hourPrice.toFixed(1);
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

        $('.headerImage').bind('click',function(){
            app.navigate("",true);
        });

        var isSubmitClicked = false;
        $('#detail-submit-button').bind('click', function(){
            isSubmitClicked = true;
            $('#detail-submit-passwordContainer').css({'visibility':'visible'});
            $("#detail-submit-password").focus();
        });

        $('#detail-submitContainer').bind('click', function(){
            isSubmitClicked = true;
        });

        $('body').bind('click',function(){
            if(isSubmitClicked){ 
                isSubmitClicked = false;
            }
            else{
                $('#detail-submit-passwordContainer').css({'visibility':'hidden'});
                $('#detail-submit-errorContainer').css({'visibility':'hidden'});
            }
        });

        $('#detail-submit-password-button').bind('click',function(){
            self.validation();
        }); 

        //bind the input to enter
        $('#detail-submit-password').keypress(function(e) {
            if(e.which == 13) {
                self.validation();
            }
        });

    },

    validation:function(){
        var self = this;
        var password = $('#detail-submit-password').val();
        if (!(password)){
            alert("请输入密码");
            //TODO add more visual effects
        }
        else if (password.length > 20){
            alert("密码不能超过20位");
        }
        else{
            if (this.allowPassword){
                self.authSubmit(password);
                $('#detail-submit-password').val("");
            }
            else{
                $('#detail-submit-errorContainer').css({'visibility':'visible'});
                $('#detail-submit-error').html("重复输入过于频繁");
            }
        }
    },

    authSubmit:function(password){
        var self = this;
        self.message.overrideUrl(authUrlOverride);
        self.message.set({'password':password});

        self.message.save({},{
            success:function(model, response){
                self.message.overrideUrl(infoUrlOverride);
                $('#detail-submit-passwordContainer').css({'visibility':'hidden'});
                $('#detail-submit-errorContainer').css({'visibility':'hidden'});
                self.messageEditView = new MessageEditView(self.message);
            },

            error: function(model, response){
                self.allowPassword = false;
                //set the timeout function, allow for submitting password 2s later
                setTimeout(function() {
                    self.allowPassword = true;
                }, 2000);
                if (response.status == 401){
                    $('#detail-submit-errorContainer').css({'visibility':'visible'});
                    $('#detail-submit-error').html("密码验证失败");
                    //$('div').effect("shake", { times:3 }, 300);
                    /*target*/
                    $('#detail-submit-password').value = "";
                }
                else if (response.status == 400){
                    alert("消息失效");
                    app.navigate("",true);
                }
                else{
                    alert("系统错误，请联系我们");
                }

            }
        });

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
        $('.headerImage').unbind();

        this.unbind();
        $(this.el).empty();

        $(this.el).append(datePickerDiv);
    }





 });