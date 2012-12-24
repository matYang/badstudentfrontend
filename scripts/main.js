var messages = new Messages();
window miliSecInDay =  86400000;


var messageView = new MessageView(messages);

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