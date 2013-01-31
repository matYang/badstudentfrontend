 var FeedBackView = Backbone.View.extend({

 	el: $('body'),


 	initialize:function(){
 		_.bindAll(this, 'render','validation','submit', 'show' ,'close');
        
        this.render();
        
 	},

 	render:function(){
        $(this.el).append("<div id = 'feedBackShow'>提供意见</div><div class='popupPanel' id='feedBackPanel'><div id = 'feedBackContainer' class = 'roundBox'><div id = 'feedBackClose'></div><div id = 'feedBackIntro'>目前我们处于v0.9 beta版本中，欢迎大家汇报问题，踊跃提出建议～</div><div id='mailto'><a href='mailto:uwse@me.com?Subject=网站不好用'>也可以发邮件给我们</a></div><textarea id = 'feedBackContent'></textarea><div id = 'feedBackNotice'>200</div><button id = 'feedBackSubmit'>提交</button></div></div>");
        
        $('#feedBackSubmit').on('click',this.validation);
        $('#feedBackShow').on('click', this.show);
        $('#feedBackClose').on('click',this.close);

        $('#feedBackContent').keyup(function(){
            var max = 200;
            var length = $(this).val().length;
            if (length > max) {
                $('#feedBackNotice').html('最长200字符...');
            } 
            else {
                var available = max - length;
                $('#feedBackNotice').html(available);
            }
        });
        
 	},

    validation:function(){
        var proceed = true;
        this.content = $('#feedBackContent').val();

        if (this.content.length < 1){
            proceed = false;
            alert("请至少输入一个字符");
        }
        if (this.content.length > 200){
            proeed = false;
            alert("反馈太长了。。。。你还是发邮件吧");
        }

        if (proceed){
            this.submit();
        }

    },

    submit:function(){
        var self = this;
        $.ajax({
            type: "POST",
            url: origin + "/api/badstudent/v0.9/feedBack",
            data: self.content,
            dataType: 'text',
            success: function(data){
                $('#feedBackNotice').css({'color': 'green'});
                $('#feedBackNotice').html("消息发布成功！谢谢您的建议");
                setTimeout(function() {
                    $('#feedBackNotice').css({'color': '#888'});
                    self.close()
                },  1500);
            },
            error: function (data, textStatus, jqXHR){
                if (textStatus && textStatus == 400){
                    alert("出错了，请稍后再试");
                }
                alert("出错了，请稍后再试");
            },
        });
    },

    show:function(){
        $('#feedBackContent').val("");
        $('#feedBackNotice').html(200);
        $('#feedBackSubmit').css({'-webkit-transition-duration': '0.2s'});
        var height = $('body').css('height');
        var width = $('body').css('width');
        $('#feedBackPanel').css({'height':height});
        $('#feedBackPanel').css({'width':width});
        $('#feedBackPanel').css({'visibility':'visible'});
        $("#feedBackContent").focus();
    },

    close:function(){
        $('#feedBackSubmit').css({'-webkit-transition-duration': '0s'});
        $('#feedBackPanel').css({'visibility':'hidden'});
    }


 });