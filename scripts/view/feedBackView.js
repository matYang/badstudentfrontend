 var FeedBackView = Backbone.View.extend({

 	el: $('body'),


 	initialize:function(){
 		_.bindAll(this, 'render','validation','submit', 'show' ,'close');
        
        this.render();
        
 	},

 	render:function(){
        $(this.el).append("<div id = 'feedBackShow'>提供意见</div>");
        $('body').append("<div class='popupPanel' id='feedBackPanel'></div>");
        $('#feedBackPanel').append("<div id = 'feedBackContainer'></div>");
        $('#feedBackContainer').append("<div id = 'feedBackClose'>X</div>");
        $('#feedBackContainer').append("<div id = 'feedBackIntro'>目前我们处于v0.9 beta版本中，欢迎大家汇报问题，踊跃提出建议～</div>");
        $('#feedBackContainer').append("<textarea id = 'feedBackContent'></textarea>");
        $('#feedBackContainer').append("<button id = 'feedBackSubmit'>提交</button>");

        $('#feedBackSubmit').on('click',this.validation);
        $('#feedBackShow').on('click', this.show);
        $('#feedBackClose').on('click',this.close);
        
 	},

    validation:function(){
        var proceed = true;
        this.content = $('#feedBackContent').val();

        if (this.content.length < 3){
            proceed = false;
            alert("feedBack too short, minimum 3 characters ");
        }
        if (this.content.length > 300){
            proeed = false;
            alert("feedBack too long, max 1000");
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
                $('#feedBackContent').value = "";
                self.close();
            },
            error: function (data, textStatus, jqXHR){
                if (textStatus && textStatus == 400){
                    alert("An error occurred,try again later.")
                }
                alert("An error occurred,try again later.")
            },
        });
    },

    show:function(){
        $('#feedBackPanel').css({'visibility':'visible'});
    },

    close:function(){
        $('#feedBackPanel').css({'visibility':'hidden'});
    }


 });