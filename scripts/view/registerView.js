 var RegisterView= Backbone.View.extend({


 	initialize:function(searchResult,locationArray, startDate, endDate, content, gender, price, type){
 		_.bindAll(this,'render','bindEvents', 'complete', 'close');
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
 		$('#register-modal-main').append("<div class='popUpCloseButton' id='register-modal-closeButton'>X</div>");
 		if (this.type == 0){
 			$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-courseLengthInMinutesContainer'><div class = 'modal-container-word' id = 'register-modal-courseLengthInMinutesWord'>课时长（分钟）</div><input class = 'modal-input' id = 'register-modal-courseLengthInMinutes'/></div>");
 		}
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-emailContainer'><div class = 'modal-container-word' id = 'register-modal-emailWord'>邮箱</div><input class = 'modal-input' id = 'register-modal-email'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-phoneContainer'><div class = 'modal-container-word' id = 'register-modal-phoneWord'>电话</div><input class = 'modal-input' id = 'register-modal-phone'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-qqContainer'><div class = 'modal-container-word' id = 'register-modal-qqWord'>QQ</div><input class = 'modal-input' id = 'register-modal-qq'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-twitterContainer'><div class = 'modal-container-word' id = 'register-modal-twitterWord'>微博</div><input class = 'modal-input' id = 'register-modal-twitter'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-selfDefinedContainer'><div class = 'modal-container-word' id = 'register-modal-selfDefinedWord'>自定义</div><input class = 'modal-input' id = 'register-modal-selfDefined'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-noticeContainer' id = 'register-modal-noticeContainer'><p class = 'modal-notice' id = 'register-modal-notice'>请至少填写一项</p></div>");

 		$('#register-modal-main').append("<hr>");

 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-passwordContainer'><div class = 'modal-container-word' id = 'register-modal-passwordWord'>密码</div><input class = 'modal-input' id = 'register-modal-password'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-confirmPasswordContainer'><div class = 'modal-container-word' id = 'register-modal-confirmPasswordWord'>确认密码</div><input class = 'modal-input' id = 'register-modal-confirmPassword'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-submit' id = 'register-modal-submit'>就这样吧<img class = 'submit-icon' src = 'asset/submit.png'/></div>");

 		togglePopup("registerViewPanel");

 	},

 	bindEvents:function(){
 		$('#register-modal-closeButton').bind('click',this.close);

		$('#register-modal-submit').bind('click',this.complete); 		
 	},

 	complete:function(){
 		if (this.type == 0){
			this.courseLengthInMinutes = $('#register-modal-courseLengthInMinutes').val();
 		}
 		else if (this.type == 1){
 			this.courseLengthInMinutes = 60;
 		}
 		this.email = $('#register-modal-email').val();
 		this.phone = $('#register-modal-phone').val();
 		this.qq = $('#register-modal-qq').val();
 		this.twitter = $('#register-modal-twitter').val();
 		this.selfDefined = $('#register-modal-selfDefined').val();
 		this.password = $('#register-modal-password').val();

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
				console.log("POST succeeded");
				console.log(model.get('id'));
				self.searchResult.add(newMessage);
				app.navigate("message/" + newMessage.get('id'), true);
			},
			
			error: function(){
				console.log("POST failed");
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