 var SearchResultView= Backbone.View.extend({


 	initialize:function(targetId, searchResults, gender){
 		_.bindAll(this,'render'， 'fill', 'getDateString' ，'close');

 		this.template = _.template(tpl.get('resultsTemplate')),

        this.targetId = targetId;
        this.searchResults = searchResults;
        this.gender = gender;
        this.typeArray = new Array();
        this.typeArray[0] = "求人帮忙";
        this.typeArray[1] = "帮人点名";
        this.weekDayArray = new Array();
        this.weekDayArray[0] = "周一";
        this.weekDayArray[1] = "周二";
        this.weekDayArray[2] = "周三";
        this.weekDayArray[3] = "周四";
        this.weekDayArray[4] = "周五";
        this.weekDayArray[5] = "周六";
        this.weekDayArray[6] = "周日";

        this tempDate = new Date();

        console.log("SearchResultView opening with targetId: " + this.targetId + " and Message Collection: " + this.searchResults);
        this.render();
 	},

 	render:function(){
 		if (this.gender == 2){
 			for (var i = 0; i < this.searchResults.length; i++){
 				var curModel = this.searchResults.at(i);
            	$(this.targetId).append(this.template(curModel.toJSON()));
            	this.fill(curModel);

            }
        }
 		else if (this.gender == 0 || this.gender == 1){
 			for (var i = 0; i < this.searchResults.length; i++){
 				if (this.searchResults.at(i).get('gender') == this.gender){
 					var curModel = this.searchResults.at(i);
 					$(this.targetId).append(this.template(curModel.toJSON()));
 					this.fill(curModel);
 				}
            }
 		}
		 		
 	},

 	fill:function(curModel){
 		var curId = '#' + curModel.get('id');

    	var university = curModel.get('location').split(" ")[2];
    	$(curId +  ' .searchResultLocation').html(university);

    	var startDateString = this.getDateString(curModel.get('startDate'));
    	if (curModel.get('type') == 0){
    		$(curId +  ' .searchResultWindow').html(startDateString)
    	}
    	else if (curModel.get('type') == 1){
    		var endDateString = this.getDateString(curModel.get('endDate'));
    		$(curId +  ' .searchResultWindow').html(startDateString + "到" ＋ endDateString + "有空")
    	}


		$(curId +  ' .searchResultType').html(this.typeArray[curModel.get('type')]);

		if (curModel.get('type') == 1){
			$(curId +  ' .searchResultTotalValue').html(curModel.get('price') + "/时");
		}
		if (curModel.get('type') == 0){
			var hour = curModel.get('courseLengthInMinutes')/60;
			var hourPrice = curModel.get('price')/hour
			$(curId +  ' .searchResultDividedPrice').html(hour + "小时 / 单价" + hourPrice);
		}
 	},

 	getDateString:function(dateString){
 		var curDateArray = dateString.split(" ");
 		var curDate = new Date(curDateArray[0] + " " + (curDateArray[1]-1) + " " + curDateArray[2])
 		var today = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), this.tempDate.getDate());


 		var dayDifference = Math.ceil((curDate.getTime() - today.getTime())/miliSecInDay);

 		if (dayDifference <= 0){
 			return "今天";
 		}
 		var curDayOfWeek = curDate.getDay();
 		




 	},

 	close:function(){
        $(this.targetId).empty();
        this.unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
 	}




 });