 var EnterInfoSearchView= Backbone.View.extend({


 	initialize:function(){
 		_.bindAll(this,'render','bindEvents', 'validation' ,'complete', 'close');
 		modalOpen = true;
 		this.render();
 		this.bindEvents();

 	},

 	render:function(){
 		$('body').append("<div class='popupPanel' id='infoSearchPanel'><div class='roundBox' id='enterInfoSearch-modal-main'><div class='popUpCloseButton'      id='enterInfoSearch-modal-closeButton'></div><div class='infoSearch-modal-container'       id='enterInfoSearch-modal-emailContainer'>      <div class='infoSearch-modal-container-word'>邮箱</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-email' placeholder = 'lol@gamil.com' value = '" + storage.email + "'/></div><div class='infoSearch-modal-container'       id='enterInfoSearch-modal-phoneContainer'>      <div class='infoSearch-modal-container-word'>电话</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-phone' placeholder = '159000000000' value = '" + storage.phone + "'/></div><div class='infoSearch-modal-container'       id='enterInfoSearch-modal-qqContainer'>         <div class='infoSearch-modal-container-word'>QQ</div>   <input class='infoSearch-modal-input' id='enterInfoSearch-modal-qq' placeholder = '100000086' value = '" + storage.qq + "'/></div><div class='infoSearch-modal-container'       id='enterInfoSearch-modal-twitterContainer'>    <div class='infoSearch-modal-container-word'>微博</div>  <input class='infoSearch-modal-input' id='enterInfoSearch-modal-twitter' placeholder = '@huaixuesheng' value = '" + storage.twitter + "'/></div><div class='infoSearch-modal-container'       id='enterInfoSearch-modal-selfDefinedContainer'><div class='infoSearch-modal-container-word'>自定义</div><input class='infoSearch-modal-input' id='enterInfoSearch-modal-selfDefined' placeholder = '有缘会猜到我号码的' value = '" + storage.selfDefined + "'/></div><div id='modal-noticeContainer'>请至少填写一项</div><button id = 'enterInfoSearch-modal-submit'>找一找</button></div></div>");

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

		/*targeted, add more friendly alert instead of js alert*/
 		if (!(this.email || this.phone || this.qq || this.twitter || this.selfDefined)){
 			proceed = false;
 			alert("请至少输入一项联系方式");
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