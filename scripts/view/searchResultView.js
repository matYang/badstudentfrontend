 var SearchResultView= Backbone.View.extend({


 	initialize:function(targetId, searchResults, gender){
 		_.bindAll(this,'render','fill', 'getDateString' , 'close');

 		this.template = _.template(tpl.get('resultsTemplate')),

        this.targetId = targetId;
        this.searchResults = searchResults;
        this.gender = gender;
        this.typeArray = new Array();
        this.typeArray[0] = "求人帮忙";
        this.typeArray[1] = "帮人点名";
        this.weekDayArray = new Array();
        this.weekDayArray[1] = "周一";
        this.weekDayArray[2] = "周二";
        this.weekDayArray[3] = "周三";
        this.weekDayArray[4] = "周四";
        this.weekDayArray[5] = "周五";
        this.weekDayArray[6] = "周六";
        this.weekDayArray[0] = "周日";

        this.tempDate = new Date();

        this.idArray = new Array();

        this.render();
 	},

 	render:function(){
 		if (this.gender == 2){
 			for (var i = 0; i < this.searchResults.length; i++){
 				//does not display any messages that has authCode == -2
                if (this.searchResults.at(i).get('authCode') != -2){
                    var curModel = this.searchResults.at(i);
                    curModel.set({'tpId': ('i' + tpId)});
                    this.idArray.push('i' + tpId);
                    $(this.targetId).append(this.template(curModel.toJSON()));
                    this.fill(curModel, ('i' + tpId));
                    tpId++;
                }
    
            }
        }
 		else if (this.gender == 0 || this.gender == 1){
 			for (var i = 0; i < this.searchResults.length; i++){
 				//does not display any messages that has authCode == -2
                if (this.searchResults.at(i).get('authCode') != -2){
                    if (this.searchResults.at(i).get('gender') == this.gender){
                        var curModel = this.searchResults.at(i);
                        curModel.set({'tpId': ('i' + tpId)});
                        this.idArray.push('i' + tpId);
                        $(this.targetId).append(this.template(curModel.toJSON()));
                        this.fill(curModel, ('i' + tpId));
                        tpId++;
                    }
                }

            }
 		}
		 		
 	},

 	fill:function(curModel, tpId){
 		var curId = '#' + tpId;

        $(curId).bind('click', function(){
            app.navigate("message/" + encodeURI(curModel.get('id')), true);
        });

    	$(curId +  ' .searchResultLocation').html(curModel.get('location')['school']);

    	var startDateString = this.getDateString(curModel.get('startDate'));
    	if (curModel.get('type') == 0){
    		$(curId + ' .searchResultWindow').html(startDateString)
    	}
    	else if (curModel.get('type') == 1){
            if (curModel.get('startDate') == curModel.get('endDate')){
                $(curId + ' .searchResultWindow').html(startDateString + "有空");
            }
            else{
                var endDateString = this.getDateString(curModel.get('endDate'));
                $(curId + ' .searchResultWindow').html(startDateString + "到" + endDateString + "有空");
            }
    		
    	}


		$(curId +  ' .searchResultType').html(this.typeArray[curModel.get('type')]);

		if (curModel.get('type') == 1){
			$(curId +  ' .searchResultTotalValue').html("&yen;" + curModel.get('price') + "<span class = 'searchResultTotalValueSpan'>/时</span>");
            $(curId +  ' .searchResultType').css("color","#E88989");
		}
		if (curModel.get('type') == 0){
            $(curId +  ' .searchResultType').css("color","#76BD5C");
			var hour = Number(curModel.get('courseLengthInMinutes')/60);

			var hourPrice = Number(curModel.get('price')/hour);
            if (!(hour % 1 === 0)){
                hour = hour.toFixed(1);
            }
            if (!(hourPrice % 1 === 0)){
                hourPrice = hourPrice.toFixed(1);
            }
			$(curId +  ' .searchResultHour').html("共 <span style='color:#3A3A7A'>" + hour + "</span>" + " 小时");
            $(curId +  ' .searchResultDividedPrice').html("每小时 " +  "<span style='color:#A53333'>" + hourPrice + "</span> 元");
		}
 	},

 	getDateString:function(dateString){
 		var curDate = parseDate(dateString);
 		var today = new Date(this.tempDate.getFullYear(), this.tempDate.getMonth(), this.tempDate.getDate());


 		var dayDifference = Math.floor((curDate.getTime() - today.getTime())/miliSecInDay);

 		if (dayDifference <= 0){
 			return "今天";
 		}
 		else if (dayDifference == 1){
 			return "明天";
 		}
 		else if (dayDifference == 2){
 			return "后天";
 		}

 		var curDayOfWeek = curDate.getDay();
 		var todayOfWeek = today.getDay();

 		if ((todayOfWeek + dayDifference) > 13){
 			return (curDate.getMonth()+1) + "月" + curDate.getDate() + "日";
 		}

 		if ((todayOfWeek + dayDifference) <= 6){
 			return "这" + this.weekDayArray[curDayOfWeek];
 		}

 		if ((todayOfWeek + dayDifference) > 6){
 			return "下" + this.weekDayArray[curDayOfWeek];
 		}
 		else{
 			return "date display error";
 		}


 	},

 	close:function(){
        for (var i = 0; i < this.idArray.length; i ++){
            $('#' + this.idArray[i]).unbind();
        }

        $(this.targetId).empty();
        this.unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
 	}




 });