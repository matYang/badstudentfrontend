 var RegisterView= Backbone.View.extend({


 	initialize:function(locationArray, startDate, endDate, content, gender, price){
 		_.bindAll(this,'render','bindEvents', 'complete', 'close');
 		modalOpen = true;

 		this.locationArray = locationArray;
 		this.startDate = startDate;
 		this.endDate = endDate;
 		this.content = content;
 		this.gender = gender;
 		this.price = price;

 		this.render();

 	},

 	render:function(){
 		$('body').append("<div class = 'register-modal-mask' id = 'register-modal-mask'></div>");
 		$('body').append("<div class = 'register-modal-main' id = 'register-modal-main'></div>");
 		$('#register-modal-main').append("<div class = 'modal-close' id = 'register-modal-closeButton'>X</div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-courseLengthInMinutesContainer'><div class = 'modal-container-word' id = 'register-modal-courseLengthInMinutesWord'>课时长（分钟）</div><input class = 'modal-input' id = 'register-modal-courseLengthInMinutes'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-emailContainer'><div class = 'modal-container-word' id = 'register-modal-emailWord'>邮箱</div><input class = 'modal-input' id = 'register-modal-email'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-phoneContainer'><div class = 'modal-container-word' id = 'register-modal-phoneWord'>电话</div><input class = 'modal-input' id = 'register-modal-phone'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-qqContainer'><div class = 'modal-container-word' id = 'register-modal-qqWord'>QQ</div><input class = 'modal-input' id = 'register-modal-qq'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-twitterContainer'><div class = 'modal-container-word' id = 'register-modal-twitterWord'>微博</div><input class = 'modal-input' id = 'register-modal-twitter'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-selfDefinedContainer'><div class = 'modal-container-word' id = 'register-modal-selfDefinedWord'>自定义</div><input class = 'modal-input' id = 'register-modal-selfDefined'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-noticeContainer' id = 'register-modal-noticeContainer'><p class = 'modal-notice' id = 'register-modal-notice'>请至少填写一项</p></div>");

 		$('#register-modal-main').append("<hr>");

 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-passwordContainer'><div class = 'modal-container-word' id = 'register-modal-passwordWord'>电话</div><input class = 'modal-input' id = 'register-modal-password'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-container' id = 'register-modal-confirmPasswordContainer'><div class = 'modal-container-word' id = 'register-modal-confirmPasswordWord'>电话</div><input class = 'modal-input' id = 'register-modal-confirmPassword'/></div>");
 		$('#register-modal-main').append("<div class = 'modal-submit' id = 'register-modal-submit'>就这样吧<img class = 'submit-icon' src = 'img/submit.png'/></div>");



 	},

 	bindEvents:function(){
 		$('#register-modal-mask').bind('click',this.close);
 		$('#register-modal-closeButton').bind('click',this.close);

		$('#register-modal-submit').bind('click',this.complete); 		
 	},

 	complete:function(){
 		var encodedSearchKey = $('#enterInfoSearch-modal-email').val() + "-" + $('#enterInfoSearch-modal-phone').val() + "-" + $('#enterInfoSearch-modal-qq').val() +  "-" + $('#enterInfoSearch-modal-twitter').val() + "-" + $('#enterInfoSearch-modal-selfDefined').val();
 		app.navigate("info/" + encodedSearchKey,true);
 	},

 	close:function(){
 		$('#register-modal-mask').unbind();
 		$('#register-modal-closeButton').unbind();
 		$('#register-modal-submit').unbind();
 		$('#register-modal-mask').remove();
 		$('#register-modal-main').remove();
 		modalOpen = false;
 		this.unbind();
 		this.remove();

 		Backbone.View.prototype.remove.call(this);
 	}







 });