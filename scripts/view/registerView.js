var RegisterView= Backbone.View.extend({


 	initialize:function(searchResult,locationArray, startDate, endDate, content, gender, price, type){
 		_.bindAll(this,'render','bindEvents','validation' ,'complete', 'close');
 		modalOpen = true;

 		this.searchResult = searchResult;
 		this.locationArray = locationArray;
 		this.startDate = startDate;
 		this.endDate = endDate;
 		this.content = content;
 		this.gender = gender;
 		this.price = price;
 		this.type = type;

 		this.render();
 		this.bindEvents();

 	},

 	render:function(){
 		$('body').append("<div class='popupPanel' id='registerViewPanel'><div class='roundBox shadowBox' id='register-modal-main'><div class='popUpCloseButton' id='register-modal-closeButton'></div></div></div>");
 		if (this.type == 0){
 			$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-courseLengthInMinutesContainer' style='padding-top:10px'><div class = 'register-modal-container-word' id = 'register-modal-courseLengthInMinutesWord'>课时长</div><input class = 'register-modal-input' id = 'register-modal-courseLengthInMinutes' placeholder = '分钟 eg 45'/><span>分钟</span></div>");
			$('#register-modal-main').append("<div id = 'register-modal-notice'><div id='register-modal-noticeContainer'>请至少填写以下一项</div></div>"); 		
 		}else{
 			$('#register-modal-main').css("height","350px");
			$('#register-modal-main').append("<div id = 'register-modal-notice'><div id='register-modal-noticeContainer'>请至少填写以下一项</div></div>");
 			$('#register-modal-notice').css("padding-top","10px");
 		}
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-emailContainer'><div class = 'register-modal-container-word' id = 'register-modal-emailWord'>邮箱</div><input class = 'register-modal-input' id = 'register-modal-email' placeholder = 'dianming@gamil.com' value = '" + storage.email + "'/></div><div class = 'register-modal-container' id = 'register-modal-phoneContainer'><div class = 'register-modal-container-word' id = 'register-modal-phoneWord'>电话</div><input class = 'register-modal-input' id = 'register-modal-phone' placeholder = '15900000000' value = '" + storage.phone + "'/></div><div class = 'register-modal-container' id = 'register-modal-qqContainer'><div class = 'register-modal-container-word' id = 'register-modal-qqWord'>QQ</div><input class = 'register-modal-input' id = 'register-modal-qq' placeholder = '455877137' value = '" + storage.qq + "'/></div><div class = 'register-modal-container' id = 'register-modal-twitterContainer'><div class = 'register-modal-container-word' id = 'register-modal-twitterWord'>微博</div><input class = 'register-modal-input' id = 'register-modal-twitter' placeholder = '@huaixuesheng' value = '" + storage.twitter + "'/></div><div class = 'register-modal-container' id = 'register-modal-selfDefinedContainer'><div class = 'register-modal-container-word' id = 'register-modal-selfDefinedWord'>自定义</div><input class = 'register-modal-input' id = 'register-modal-selfDefined' placeholder = '有缘会猜到我号码的' value = '" + storage.selfDefined + "'/></div><hr><div class = 'register-modal-container' id = 'register-modal-passwordContainer'><div class = 'register-modal-container-word' id = 'register-modal-passwordWord'>密码</div><input class = 'register-modal-input' type = 'password' id = 'register-modal-password'/></div><div class = 'register-modal-container' id = 'register-modal-confirmPasswordContainer'><div class = 'register-modal-container-word' id = 'register-modal-confirmPasswordWord'>确认密码</div><input class = 'register-modal-input' type = 'password' id = 'register-modal-confirmPassword'/></div><button id = 'register-modal-submit'>就这样吧</button>");

 		togglePopup("registerViewPanel");

 	},

 	bindEvents:function(){
 		if (this.type == 0){
 			//auto corcus on the courseLength element 
 			$("#register-modal-courseLengthInMinutes").focus();
 		}
 		else{
 			//auto corcus on the email element 
 			$("#register-modal-email").focus();
 		}

 		var self = this;
 		$('#register-modal-closeButton').bind('click',this.close);

		$('#register-modal-submit').bind('click',this.validation); 	

		//bind the input to enter
        $('#register-modal-confirmPassword').keypress(function(e) {
            if(e.which == 13) {
                self.validation();
            }
        });	
 	},

 	validation:function(){
 		var proceed = true;

 		this.email = $('#register-modal-email').val();
 		this.phone = $('#register-modal-phone').val();
 		this.qq = $('#register-modal-qq').val();
 		this.twitter = $('#register-modal-twitter').val();
 		this.selfDefined = $('#register-modal-selfDefined').val();
 		this.password = $('#register-modal-password').val();

 		if (this.email.length > 0){
            var emailArray = this.email.split("@");
            if (!(emailArray.length == 2 && emailArray[0].length > 0 && emailArray[1].length > 3)){
                proceed = false;
                alert("invalid email format");
            }
            if (this.email.length > 40){
                proceed = false;
                alert("email max length 40 chars");
            }
        }
        
        if (this.phone.length > 0){
            if (!(this.phone.length > 4)){
                proceed = false;
                alert("invalid phone number format");
            }
            if (this.phone.length > 20){
                proceed = false;
                alert("phone max length 20 chars");
            }
        }
        
        if (this.qq.length > 0){
            if (!(this.qq.length > 4)){
                proceed = false;
                alert("invalid qq format");
            }
            if (this.qq.length > 40){
                proceed = false;
                alert("qq max length 40 chars");
            }
        }

        if (this.twitter.length > 20){
            proceed = false;
            alert("twitter max length 20 chars");
        }

        if (this.selfDefined.length > 20){
            proceed = false;
            alert("selfDefined max length 20 chars");
        }


 		if (this.type == 0){
			this.courseLengthInMinutes = Number($('#register-modal-courseLengthInMinutes').val());
			if (!((typeof this.courseLengthInMinutes == "number") && this.courseLengthInMinutes >= 15 && this.courseLengthInMinutes % 1 === 0)){
				proceed = false;
				alert("please enter valid cosurse length, minimum 15min");
				//TODO add more visual effects
			}
 		}
 		else if (this.type == 1){
 			this.courseLengthInMinutes = 60;
 		}


		/*targeted, add more friendly alert instead of js alert*/
 		if (!(this.email || this.phone || this.qq || this.twitter || this.selfDefined)){
 			proceed = false;
 			alert("please enter at least one entry of contact info");
 			//TODO add more visual effects
 		}

 		if (!(this.password)){
 			proceed = false;
 			alert("please enter password");
 			//TODO add more visual effects
 		}

        if (this.password.length > 20){
            proceed = false;
            alert("password max length 20 characters");
            //TODO add more visual effects
        }

 		if (!(this.password === $('#register-modal-confirmPassword').val())){
 			proceed = false;
 			alert("password not confirmed");
 			//TODO add more visual effects
 		}


 		if (proceed){
 			this.complete();
 		}
 	},

 	complete:function(){

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

 		var newMessage = new Message();

 		newMessage.set({'userName' : 'newUser', 'password' : this.password , 'startDate' : startDateString, 'endDate' : endDateString,
        'location' : locationString, 'gender' : this.gender, 'content' : this.content,
        'email' : this.email, 'phone' : this.phone, 'qq' : this.qq, 'twitter' : this.twitter, 'selfDefined' : this.selfDefined,
        'price' : this.price, "courseLengthInMinutes" : this.courseLengthInMinutes, 'authCode':-1, 'type' : this.type});

        var self = this;
		newMessage.save({},{
			success:function(model, response){

				self.searchResult.add(newMessage);
				app.navigate("message/" + encodeURI(newMessage.get('id')), true);
			},
			
			error: function(model, response){
                if (response.status == 400){
                    alert("bad request, please check the fields of the message and try again later");
                }
                else if (response.status == 409){
                    alert("message conflict with backend, please try different message fields");
                }
                else{
                    alert("system error, please report to us");
                }

			}
		});

 	},

 	close:function(){
 		togglePopup("registerViewPanel");
 		$('#register-modal-closeButton').unbind();
 		$('#register-modal-submit').unbind();
 		$('#registerViewPanel').remove();
 		modalOpen = false;
 		this.unbind();
 		this.remove();

 		Backbone.View.prototype.remove.call(this);
 	}


 });