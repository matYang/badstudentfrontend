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
 		$('#enterInfoSearch-modal-main').append("<div class='popUpCloseButton'      id='enterInfoSearch-modal-closeButton'>X</div>");
 		$('#enterInfoSearch-modal-main').append("<div class='modal-container'       id='enterInfoSearch-modal-emailContainer'>      <div class='modal-container-word'>邮箱</div>  <input class='modal-input' id='enterInfoSearch-modal-email'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='modal-container'       id='enterInfoSearch-modal-phoneContainer'>      <div class='modal-container-word'>电话</div>  <input class='modal-input' id='enterInfoSearch-modal-phone'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='modal-container'       id='enterInfoSearch-modal-qqContainer'>         <div class='modal-container-word'>QQ</div>   <input class='modal-input' id='enterInfoSearch-modal-qq'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='modal-container'       id='enterInfoSearch-modal-twitterContainer'>    <div class='modal-container-word'>微博</div>  <input class='modal-input' id='enterInfoSearch-modal-twitter'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='modal-container'       id='enterInfoSearch-modal-selfDefinedContainer'><div class='modal-container-word'>自定义</div><input class='modal-input' id='enterInfoSearch-modal-selfDefined'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div id='modal-noticeContainer'>请至少填写一项</div>");
 		$('#enterInfoSearch-modal-main').append("<div class='modal-submit'><div class='roundBox shadowBox' id='enterInfoSearch-modal-submit'>完成啦<img src='asset/submit.png' alt='Finished!'/></div></div>");

 		$('#enterInfoSearch-modal-closeButton').bind('click', this.close);

 		togglePopup("infoSearchPanel");
 	},

 	bindEvents:function(){
 		$('#enterInfoSearch-modal-closeButton').bind('click',this.close);

		$('#enterInfoSearch-modal-submit').bind('click',this.complete); 		
 	},

 	complete:function(){
 		var encodedSearchKey = $('#enterInfoSearch-modal-email').val() + "-" + $('#enterInfoSearch-modal-phone').val() + "-" + $('#enterInfoSearch-modal-qq').val() +  "-" + $('#enterInfoSearch-modal-twitter').val() + "-" + $('#enterInfoSearch-modal-selfDefined').val();
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