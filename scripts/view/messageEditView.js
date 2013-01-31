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
        this.max = 300;

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
                var dateTextArray = dateText.split("年");
                //update the system's jquery datepicker date
                var secondaryDateTextArray = dateTextArray[1].split("月");
                var thirdDateTextArray = secondaryDateTextArray[1].split("日");

                self.startDate = new Date(dateTextArray[0], secondaryDateTextArray[0]-1, thirdDateTextArray[0], 0, 0, 0, 0);

                if (!(self.startDate < self.endDate)){    //if start date is greate than end date
                    $('#detail-modal-endDatePicker').datepicker( "setDate", self.startDate);
                    self.endDate.setFullYear(self.startDate.getFullYear());
                    self.endDate.setMonth(self.startDate.getMonth());
                    self.endDate.setDate(self.startDate.getDate());
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
        $('#detail-modal-datePicker').datepicker( "option", "minDate", app.minimumDate);
        $('#detail-modal-datePicker').datepicker( "option", "dateFormat", "yy年m月d日" );
        $('#detail-modal-datePicker').datepicker( "option", "numberOfMonths", 2);



        if (this.type == 0){
            $('#detail-modal-upperRightContainer').append("<div id = 'detail-modal-courseLengthInMinutesContainer' class = 'edit-line'><div class='edit-line-label'>课时</div><input id = 'detail-modal-courseLengthInMinutes' value = '" + this.message.get('courseLengthInMinutes') + "'/><span>分钟</span></div>");
        }
        if (this.type == 1){
            $('#detail-modal-upperRightContainer').append("<div id = 'detail-modal-endDatePickerContainer' class='edit-line'><div class='edit-line-label'>到</div><input id = 'detail-modal-endDatePicker'/></div>");
            $('#detail-modal-endDatePicker').datepicker({
                onSelect: function(dateText, inst) { 
                    //because IE and Safari does not support "yyyy mm dd"
                    var dateTextArray = dateText.split("年");
                    //update the system's jquery datepicker date
                    var secondaryDateTextArray = dateTextArray[1].split("月");
                    var thirdDateTextArray = secondaryDateTextArray[1].split("日");

                    self.endDate = new Date(dateTextArray[0], secondaryDateTextArray[0]-1, thirdDateTextArray[0], 0, 0, 0, 0);
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
            if (app.minimumDate > this.startDate){
                $('#detail-modal-endDatePicker').datepicker( "option", "minDate", app.minimumDate);
            }
            else{
                $('#detail-modal-endDatePicker').datepicker( "option", "minDate", this.startDate);
            }
            $('#detail-modal-endDatePicker').datepicker( "option", "dateFormat", "yy年m月d日" );
            $('#detail-modal-endDatePicker').datepicker( "option", "numberOfMonths", 2);
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

        $('#detail-modal-content').keyup(function(){
            var length = $(this).val().length;
            if (length > self.max) {
                $('#detail-modal-wordCount').html('最长' + self.max + '字符...');
            } 
            else {
                var available = self.max - length;
                $('#detail-modal-wordCount').html(available);
            }
        });
        //default text takes length too
        var length =  $('#detail-modal-content').val().length;
        if (length > this.max){
            $('#detail-modal-wordCount').html('最长' + this.max + '字符...');
        } 
        else {
            var available = this.max - length;
            $('#detail-modal-wordCount').html(available);
        }

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
            
            error: function(model, response){
                if (response.status == 400){
                    alert("信息格式不正确，请重新确认");
                }
                else if (response.status == 401){
                    alert("验证失败，请稍后重试");
                }
                else if (response.status == 409){
                    alert("信息已被删除，现在回到主页");
                    app.navigate("", true);
                }
                else{
                    alert("系统错误，请联系我们");
                }

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
        this.price = Number($('#detail-modal-price').val());

        if (this.content.length > this.max){
            proceed = false;
            alert("内容最长" + this.max + "字");
        }

        if (this.email.length > 0){
            var emailArray = this.email.split("@");
            if (!(emailArray.length == 2 && emailArray[0].length > 0 && emailArray[1].length > 3)){
                proceed = false;
                alert("邮箱格式不正确");
            }
            if (this.email.length > 40){
                proceed = false;
                alert("邮箱长度不能超过40个字符");
            }
        }
        
        if (this.phone.length > 0){
            if (!(this.phone.length > 4)){
                proceed = false;
                alert("电话格式不正确");
            }
            if (this.phone.length > 20){
                proceed = false;
                alert("电话长度不能超过20位");
            }
        }
        
        if (this.qq.length > 0){
            if (!(this.qq.length > 4)){
                proceed = false;
                alert("QQ格式不正确");
            }
            if (this.qq.length > 40){
                proceed = false;
                alert("QQ长度不能超过40位");
            }
        }

        if (this.twitter.length > 20){
            proceed = false;
            alert("微博长度不能超过20位");
        }

        if (this.selfDefined.length > 20){
            proceed = false;
            alert("自定义长度不能超过20位");
        }


        if (this.type == 0){
            this.courseLengthInMinutes = Number($('#detail-modal-courseLengthInMinutes').val());
            this.endDate = this.startDate;  //sync date
            if (!((typeof this.courseLengthInMinutes == "number") && this.courseLengthInMinutes >= 15 && this.courseLengthInMinutes % 1 === 0)){
                proceed = false;
                alert("课程长度最短15分钟，必须是整数");
                //TODO add more visual effects
            }
        }
        else if (this.type == 1){
            this.courseLengthInMinutes = this.message.get('courseLengthInMinutes');
        }

        if (!(typeof this.price == "number" && this.price > 0 && this.price % 1 === 0)){
            proceed = false;
            alert("请输入一个大于0的整数");
            //TODO add more visual effects
        }

        if (typeof this.price == "number" && this.price > 999){
            proceed = false;
            alert("最多选¥999");
            // add more visual effects
        }

        if (!(this.email || this.phone || this.qq || this.twitter || this.selfDefined)){
            proceed = false;
            alert("请至少输入一项联系方式");
            //TODO add more visual effects
        }

        if (proceed){
            this.updateMessage();
        }
    },

    updateMessage:function(){
        var self = this;

        if (supportStorage){
            localStorage.email = this.email;
            localStorage.phone = this.phone;
            localStorage.qq = this.qq;
            localStorage.twitter = this.twitter;
            localStorage.selfDefined = this.selfDefined;
        }
        storage.email = this.email;
        storage.phone = this.phone;
        storage.qq = this.qq;
        storage.twitter = this.twitter;
        storage.selfDefined = this.selfDefined;

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
            
            error: function(model, response){
                if (response.status == 400){
                    alert("信息格式不正确，请重新确认");
                }
                else if (response.status == 401){
                    alert("验证失败，请稍后重试");
                }
                else if (response.status == 409){
                    alert("信息已被删除，现在回到主页");
                    app.navigate("", true);
                }
                else{
                    alert("系统错误，请联系我们");
                }

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