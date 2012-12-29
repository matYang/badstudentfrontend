 var EnterInfoSearchView= Backbone.View.extend({


 	initialize:function(){
 		_.bindAll(this,'render','bindEvents', 'complete', 'close');
 		modalOpen = true;
 		this.render();
 		this.bindEvents();

 	},

 	render:function(){
 		$('body').append("<div class = 'enterInfoSearch-modal-mask' id = 'enterInfoSearch-modal-mask'></div>");
 		$('body').append("<div class = 'enterInfoSearch-modal-main' id = 'enterInfoSearch-modal-main'></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-close' id = 'enterInfoSearch-modal-closeButton'>X</div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-container' id = 'enterInfoSearch-modal-emailContainer'><div class = 'modal-container-word' id = 'enterInfoSearch-modal-emailWord'>邮箱</div><input class = 'modal-input' id = 'enterInfoSearch-modal-email'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-container' id = 'enterInfoSearch-modal-phoneContainer'><div class = 'modal-container-word' id = 'enterInfoSearch-modal-phoneWord'>电话</div><input class = 'modal-input' id = 'enterInfoSearch-modal-phone'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-container' id = 'enterInfoSearch-modal-qqContainer'><div class = 'modal-container-word' id = 'enterInfoSearch-modal-qqWord'>QQ</div><input class = 'modal-input' id = 'enterInfoSearch-modal-qq'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-container' id = 'enterInfoSearch-modal-twitterContainer'><div class = 'modal-container-word' id = 'enterInfoSearch-modal-twitterWord'>微博</div><input class = 'modal-input' id = 'enterInfoSearch-modal-twitter'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-container' id = 'enterInfoSearch-modal-selfDefinedContainer'><div class = 'modal-container-word' id = 'enterInfoSearch-modal-selfDefinedWord'>自定义</div><input class = 'modal-input' id = 'enterInfoSearch-modal-selfDefined'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-noticeContainer' id = 'enterInfoSearch-modal-noticeContainer'><p class = 'modal-notice' id = 'enterInfoSearch-modal-notice'>请至少填写一项</p></div>");
 		$('#enterInfoSearch-modal-main').append("<div class = 'modal-submit' id = 'enterInfoSearch-modal-submit'>完成啦<img class = 'submit-icon' src = 'img/submit.png'/></div>");


 	},

 	bindEvents:function(){
 		$('#enterInfoSearch-modal-mask').bind('click',this.close);
 		$('#enterInfoSearch-modal-closeButton').bind('click',this.close);

		$('#enterInfoSearch-modal-submit').bind('click',this.complete); 		
 	},

 	complete:function(){
 		var encodedSearchKey = $('#enterInfoSearch-modal-email').val() + "-" + $('#enterInfoSearch-modal-phone').val() + "-" + $('#enterInfoSearch-modal-qq').val() +  "-" + $('#enterInfoSearch-modal-twitter').val() + "-" + $('#enterInfoSearch-modal-selfDefined').val();
 		app.navigate("info/" + encodedSearchKey,true);
 	},

 	close:function(){
 		$('#enterInfoSearch-modal-mask').unbind();
 		$('#enterInfoSearch-modal-closeButton').unbind();
 		$('#enterInfoSearch-modal-submit').unbind();
 		$('#enterInfoSearch-modal-mask').remove();
 		$('#enterInfoSearch-modal-main').remove();
 		modalOpen = false;
 		this.unbind();
 		this.remove();

 		Backbone.View.prototype.remove.call(this);
 	}







 });