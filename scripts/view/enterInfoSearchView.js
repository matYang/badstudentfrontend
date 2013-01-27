 var EnterInfoSearchView= Backbone.View.extend({


 	initialize:function(){
 		_.bindAll(this,'render','bindEvents', 'validation' ,'complete', 'close');
 		modalOpen = true;
 		this.render();
 		this.bindEvents();

 	},

 	render:function(){
 		$('body').append("<div class='popupPanel' id='infoSearchPanel'></div>");
 		$('#infoSearchPanel').append("<div class='roundBox' id='enterInfoSearch-modal-main'></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='popUpCloseButton'      id='enterInfoSearch-modal-closeButton'></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-emailContainer'>      <div class='infoSearch-modal-container-word'>邮箱</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-email' placeholder = 'lol@gamil.com' value = '" + storage.email + "'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-phoneContainer'>      <div class='infoSearch-modal-container-word'>电话</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-phone' placeholder = '159000000000' value = '" + storage.phone + "'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-qqContainer'>         <div class='infoSearch-modal-container-word'>QQ</div>   <input class='infoSearch-modal-input' id='enterInfoSearch-modal-qq' placeholder = '100000086' value = '" + storage.qq + "'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-twitterContainer'>    <div class='infoSearch-modal-container-word'>微博</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-twitter' placeholder = '@huaixuesheng' value = '" + storage.twitter + "'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div class='infoSearch-modal-container'       id='enterInfoSearch-modal-selfDefinedContainer'><div class='infoSearch-modal-container-word'>自定义</div><input class='infoSearch-modal-input' id='enterInfoSearch-modal-selfDefined' placeholder = '有缘会猜到我号码的' value = '" + storage.selfDefined + "'/></div>");
 		$('#enterInfoSearch-modal-main').append("<div id='modal-noticeContainer'>请至少填写一项</div>");
 		$('#enterInfoSearch-modal-main').append("<div class='roundBox shadowBox' id='enterInfoSearch-modal-submit'><p>完成啦</p><img src='asset/pencil.png' alt='pencil.png'/></div>");

 		$('#enterInfoSearch-modal-closeButton').bind('click', this.close);

 		togglePopup("infoSearchPanel");
 	},

 	bindEvents:function(){
 		$('#enterInfoSearch-modal-closeButton').bind('click',this.close);

		$('#enterInfoSearch-modal-submit').bind('click',this.validation); 		
 	},

 	validation:function(){
 		var proceed = true;

 		this.email = $('#enterInfoSearch-modal-email').val();
 		this.phone = $('#enterInfoSearch-modal-phone').val();
 		this.qq = $('#enterInfoSearch-modal-qq').val();
 		this.twitter = $('#enterInfoSearch-modal-twitter').val();
 		this.selfDefined = $('#enterInfoSearch-modal-selfDefined').val();

 		if (this.email.length > 0){
            var emailArray = this.email.split("@");
            if (!(emailArray.length == 2 && emailArray[0].length > 0 && emailArray[1].length > 3)){
                proceed = false;
                alert("invalid email format");
            }
            if (this.email.length > 50){
                proceed = false;
                alert("email max length 50 chars");
            }
        }
        
        if (this.phone.length > 0){
            if (!(this.phone.length > 4)){
                proceed = false;
                alert("invalid phone number format");
            }
            if (this.phone.length > 20){
                proceed = false;
                alert("phone max length 50 chars");
            }
        }
        
        if (this.qq.length > 0){
            if (!(this.qq.length > 4)){
                proceed = false;
                alert("invalid qq format");
            }
            if (this.qq.length > 50){
                proceed = false;
                alert("qq max length 50 chars");
            }
        }

        if (this.twitter.length > 50){
            proceed = false;
            alert("twitter max length 50 chars");
        }

        if (this.selfDefined.length > 50){
            proceed = false;
            alert("selfDefined max length 50 chars");
        }

		/*targeted, add more friendly alert instead of js alert*/
 		if (!(this.email || this.phone || this.qq || this.twitter || this.selfDefined)){
 			proceed = false;
 			alert("please enter at least one entry of contact info");
 			//TODO add more visual effects
 		}

 		if (proceed){
 			this.complete();
 		}

 	},

 	complete:function(){
 		var encodedSearchKey = encodeURI(this.email + "-" + this.phone + "-" + this.qq +  "-" + this.twitter + "-" + this.selfDefined);
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