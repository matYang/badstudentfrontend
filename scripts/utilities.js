var dayToMili = function(dayNum){
	return Number(dayNum) * miliSecInDay;
};

var miliToDay = function(miliNum){
	return Math.floor(Number(miliNum) / miliSecInDay);
};

function main(user){
	

	console.log("start fetching"); 
	messages.fetch({
		
		dataType:'json',
		
        success: function (model, response) {
            console.log("fetch success"); 
            console.log(response);
            mainInit();
        },
        
		error: function(model, response){
			console.log("fetch failed");
			console.log(response);
			alert("failed to fetch data from server");
		}
    });
}

