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
 		$('body').append("<div class='popupPanel' id='registerViewPanel'></div>");
 		$('#registerViewPanel').append("<div class='roundBox shadowBox' id='register-modal-main'></div>");
 		$('#register-modal-main').append("<div class='popUpCloseButton' id='register-modal-closeButton'></div>");
 		if (this.type == 0){
 			$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-courseLengthInMinutesContainer' style='padding-top:10px'><div class = 'register-modal-container-word' id = 'register-modal-courseLengthInMinutesWord'>课时长</div><input class = 'register-modal-input' id = 'register-modal-courseLengthInMinutes'/></div>");
			$('#register-modal-main').append("<div id = 'register-modal-notice'><div id='register-modal-noticeContainer'>请至少填写已下一项</div></div>"); 		
 		}else{
 			$('#register-modal-main').css("height","350px");
			$('#register-modal-main').append("<div id = 'register-modal-notice'><div id='register-modal-noticeContainer'>请至少填写已下一项</div></div>");
 			$('#register-modal-notice').css("padding-top","10px");
 		}
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-emailContainer'><div class = 'register-modal-container-word' id = 'register-modal-emailWord'>邮箱</div><input class = 'register-modal-input' id = 'register-modal-email'/></div>");
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-phoneContainer'><div class = 'register-modal-container-word' id = 'register-modal-phoneWord'>电话</div><input class = 'register-modal-input' id = 'register-modal-phone'/></div>");
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-qqContainer'><div class = 'register-modal-container-word' id = 'register-modal-qqWord'>QQ</div><input class = 'register-modal-input' id = 'register-modal-qq'/></div>");
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-twitterContainer'><div class = 'register-modal-container-word' id = 'register-modal-twitterWord'>微博</div><input class = 'register-modal-input' id = 'register-modal-twitter'/></div>");
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-selfDefinedContainer'><div class = 'register-modal-container-word' id = 'register-modal-selfDefinedWord'>自定义</div><input class = 'register-modal-input' id = 'register-modal-selfDefined'/></div>");

 		$('#register-modal-main').append("<hr>");

 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-passwordContainer'><div class = 'register-modal-container-word' id = 'register-modal-passwordWord'>密码</div><input class = 'register-modal-input' type = 'password' id = 'register-modal-password'/></div>");
 		$('#register-modal-main').append("<div class = 'register-modal-container' id = 'register-modal-confirmPasswordContainer'><div class = 'register-modal-container-word' id = 'register-modal-confirmPasswordWord'>确认密码</div><input class = 'register-modal-input' type = 'password' id = 'register-modal-confirmPassword'/></div>");
 		$('#register-modal-main').append("<div class='roundBox shadowBox' id = 'register-modal-submit'><p>就这样吧</p><img class = 'submit-icon' src='asset/铅笔.png' alt='铅笔.png'/></div>");

 		togglePopup("registerViewPanel");

 	},

 	bindEvents:function(){
 		$('#register-modal-closeButton').bind('click',this.close);

		$('#register-modal-submit').bind('click',this.validation); 		
 	},

 	validation:function(){
 		var proceed = true;

 		this.email = $('#register-modal-email').val();
 		this.phone = $('#register-modal-phone').val();
 		this.qq = $('#register-modal-qq').val();
 		this.twitter = $('#register-modal-twitter').val();
 		this.selfDefined = $('#register-modal-selfDefined').val();
 		this.password = $('#register-modal-password').val();
		/*targeted, add more friendly alert instead of js alert*/
 		if (!(this.email || this.phone || this.qq || this.twitter || this.selfDefined)){
 			proceed = false;
 			alert("please enter at least one entry of contact info");
 		}

 		if (!(this.password)){
 			proceed = false;
 			alert("please enter password");
 		}

 		if (!(this.password === $('#register-modal-confirmPassword').val())){
 			proceed = false;
 			alert("password not confirmed");
 		}


 		if (proceed){
 			this.complete();
 		}
 	},

 	complete:function(){
 		if (this.type == 0){
			this.courseLengthInMinutes = $('#register-modal-courseLengthInMinutes').val();
 		}
 		else if (this.type == 1){
 			this.courseLengthInMinutes = 60;
 		}

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
			
			error: function(){

				alert("POST Error: check server configuration");
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