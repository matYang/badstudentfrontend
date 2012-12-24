var dayToMili = function(dayNum){
	return Number(dayNum) * miliSecInDay;
}

var miliToDay = function(miliNum){
	return Math.floor(Number(miliNum) / miliSecInDay);
}