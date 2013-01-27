var dayToMili = function(dayNum){
	return Number(dayNum) * miliSecInDay;
};

var miliToDay = function(miliNum){
	return Math.floor(Number(miliNum) / miliSecInDay);
};

function main(user){
	

	messages.fetch({
		
		dataType:'json',
		
        success: function (model, response) {

            
            mainInit();
        },
        
		error: function(model, response){

			alert("failed to fetch data from server");
		}
    });
}

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */

jQuery(function($){
        $.datepicker.regional['zh-CN'] = {
                closeText: '关闭',
                prevText: '&#x3c;上月',
                nextText: '下月&#x3e;',
                currentText: '今天',
                monthNames: ['一月','二月','三月','四月','五月','六月',
                '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort: ['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六'],
                weekHeader: '周',
                dateFormat: 'yy mm dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '年'};
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

//Pop-up

function togglePopup(box){
    var popupPanel = $('#'+box);
    if(popupPanel.css("visibility") === "visible"){
        popupPanel.css("visibility", "hidden");
    } else {
        popupPanel.css("visibility", "visible");
        popupPanel.css("width", $(".full-width").width());
        popupPanel.css("height", $(".full-width").height());
    }
}

navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
})();

// Calander
function calander(startDate,endDate){
    var height = $('#calendar-holder').height();
    $('#calendar').fullCalendar({
        theme: true,
        header: false,
        weekMode: 'liquid',
        height: height,
        firstDay: 1,
        editable: false,
    });
    if(endDate){
    }else{
        endDate = startDate;
    }
    $('#calendar').fullCalendar('select',startDate,endDate,'allDay');
}

var monthArray = {'Jan': 0, 'Feb':1, 'Mar':2, 'Apr':3, 'May':4, 'Jun':5, 'Jul':6, 'Aug':7, 'Sep':8, 'Oct':9, 'Nov': 10, 'Dec': 11};
function parseDate(dateString){
        
        var dateArray = dateString.split(" ");
        var date = new Date();
        date.setFullYear(dateArray[5]);
        date.setMonth(monthArray[dateArray[1]]);
        date.setDate(dateArray[2]);
        return date;
}


function isStorageSupported() {
    if (typeof(localStorage) === "undefined" || typeof(sessionStorage) === "undefined") {
        alert("Poor guy..your browser does not even support web storage...");
        return false;
    }
    return true;
}


/*
var browserInfo = {'opera' : false, 'chrome' : false, 'safari' : false, 'firefox' : false, 'msie' : false};
var browserName = navigator.sayswho[0];
if (browserName == 'Msie'){
    browserInfo.msie = true;
}
else if (browserName == 'Chrome'){
    browserInfo.chrome = true;
}
else if (browserName == 'Safari'){
    browserInfo.safari = true;
}
else if (browserName == 'Firefox'){
    browserInfo.firefox = true;
}
else if (browserName == 'Opera'){
    browserInfo.opera = true;
}*/