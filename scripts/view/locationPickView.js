 var LocationPickView = Backbone.View.extend({

 	tagName: 'div',

 	initialize:function(locationArray){
 		_.bindAll(this, 'render','provinceDOMGenerator', 'cityDOMGenerator', 'universityDOMGenerator', 'close');
 		this.locationArray = locationArray;

 		this.render();
 	},

 	render:function(){
 		$('body').append("<div class = 'location-modal-main' id = 'location-modal-main'></div>");
 		$('#location-modal-main').append("<div class = 'location-modal-titleContainer' id = 'location-modal-titleContainer'><p id = 'location-modal-title'>请选择位置</p></div>");
 		$('#location-modal-main').append("<div class = 'location-modal-provinceContainer' id = 'location-modal-provinceContainer'></div>");
 		$('#location-modal-main').append("<div class = 'location-modal-cityContainer' id = 'location-modal-cityContainer'></div>");
 		$('#location-modal-main').append("<div class = 'location-modal-universityContainer' id = 'location-modal-universityContainer'></div>");
 		$('#location-modal-main').append("<div class = 'location-modal-closeButton' id = 'location-modal-closeButton'></div>");

 		
 	},

 	provinceDOMGenerator:function(province){
 		return "<div class = location-modal-province>" + province + "</div>";
 	},

	cityDOMGenerator:function(city){
		return "<div class = location-modal-city>" + city + "</div>";
 	},

 	universityDOMGenerator:function(university){
 		return "<div class = location-modal-university>" + university + "</div>";
 	}, 	

 	close:function(){
 		this.unbind();
 		this.remove();

 	}




 });