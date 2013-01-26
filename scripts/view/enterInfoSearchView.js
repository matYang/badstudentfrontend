 var EnterInfoSearchView= Backbone.View.extend({


 	initialize:function(){
 		_.bindAll(this,'render','bindEvents', 'complete', 'close');
 		modalOpen = true;
 		this.render();
 		this.bindEvents();

 	},

 	render:function(){
 		$('body').append("<div class='popupPanel' id='infoSearchPanel'></div>");
 		$('#infoSearchPanel').append("<div class='roundBox' id='enterInfoSearch-modal-main'></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='popUpCloseButton'      id='enterInfoSearch-modal-closeButton'></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-emailContainer'>      <div class='infoSearch-modal-container-word'>邮箱</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-email' placeholder = 'lol@gamil.com'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-phoneContainer'>      <div class='infoSearch-modal-container-word'>电话</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-phone' placeholder = '159000000000'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-qqContainer'>         <div class='infoSearch-modal-container-word'>QQ</div>   <input class='infoSearch-modal-input' id='enterInfoSearch-modal-qq' placeholder = '100000086'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-twitterContainer'>    <div class='infoSearch-modal-container-word'>微博</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-twitter' placeholder = '@huaixuesheng'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-selfDefinedContainer'><div class='infoSearch-modal-container-word'>自定义</div><input class='infoSearch-modal-input' id='enterInfoSearch-modal-selfDefined' placeholder = '有缘会猜到我号码的'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div id='modal-noticeContainer'>请至少填写一项</div>");
 		$('#enterInfoSearch-modal-main').append("<div class='roundBox shadowBox' id='enterInfoSearch-modal-submit'><p>完成啦</p><img src='asset/pencil.png' alt='pencil.png'/></div>");

 		$('#enterInfoSearch-modal-closeButton').bind('click', this.close);

 		togglePopup("infoSearchPanel");
 	},

 	bindEvents:function(){
 		$('#enterInfoSearch-modal-closeButton').bind('click',this.close);

		$('#enterInfoSearch-modal-submit').bind('click',this.complete); 		
 	},

 	complete:function(){
 		var encodedSearchKey = encodeURI($('#enterInfoSearch-modal-email').val() + "-" + $('#enterInfoSearch-modal-phone').val() + "-" + $('#enterInfoSearch-modal-qq').val() +  "-" + $('#enterInfoSearch-modal-twitter').val() + "-" + $('#enterInfoSearch-modal-selfDefined').val());
 		app.navigate("info/" + encodedSearchKey,true);
 	},

 	close:function(){
 		togglePopup("infoSearchPanel");
 		$('#enterInfoSearch-modal-closeButton').unbind();
 		$('#enterInfoSearch-modal-submit').unbind();
 		$('#infoSearchPanel').remove();
 		modalOpen = false;
 		this.unbind();
 		this.remove();

 		Backbone.View.prototype.remove.call(this);
 	}







 });