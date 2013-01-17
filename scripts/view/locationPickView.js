 var LocationPickView = Backbone.View.extend({

 	tagName: 'div',

 	initialize:function(locationArray, initiator){
 		_.bindAll(this, 'render','getProvinces','getCities', 'getUniversities','provinceDOMGenerator', 'cityDOMGenerator', 'universityDOMGenerator', 'complete','close', 'highLight');
 		this.locationArray = locationArray;
 		this.provinceName = locationArray[0];
 		this.cityName = locationArray[1];
 		this.universityName = locationArray[2];
 		this.initiator = initiator;
 		modalOpen = true;   //tell window that there is a modal view in place
 		doubleModalOpen = true;

 		this.render();
 	},

 	render:function(){
 		$('body').append("<div class='popupPanel' id='locationSearchPanel'></div>");
 		$('#locationSearchPanel').append("<div class='roundBox' id='popupBoxLocation'></div>");
 		$('#popupBoxLocation').append("<div class='popUpCloseButton' id='location-modal-closeButton'>X</div>");
 		$('#popupBoxLocation').append("<div id='location-modal-titleContainer'><p>请选择大学</p></div>");
 		$('#popupBoxLocation').append("<div class='roundBox' id='location-modal-provinceContainer'></div>");
 		$('#popupBoxLocation').append("<div class='roundBox' id='location-modal-cityContainer'></div>");
 		$('#popupBoxLocation').append("<div class='roundBox' id='location-modal-universityContainer'></div>");
 		
 		$('#location-modal-closeButton').bind('click', this.close);
 		this.getProvinces();
 		togglePopup("locationSearchPanel");
 	},

 	getProvinces:function(){
 		var provinceContainer = $('#location-modal-provinceContainer');
 		var self = this;
 		$.ajax({
			type: "GET",
			async: false,
			url: "../api/badstudent/v0.9/location",
			dataType: 'json',
			success: function(data){
				for(eachIndex in data){
					provinceContainer.append(self.provinceDOMGenerator(data[eachIndex]));
				}
				$('.location-modal-province').bind('click', function(){
					self.provinceName = $(this).html();
					self.getCities(self.provinceName);
					
					self.highLight($(this),"province");
					self.highLightedProvince = $(this);
				});

				self.provinceName = $('.location-modal-province').first().html();
				self.getCities();
				self.highLight($('.location-modal-province').first(),"province");
				self.highLightedProvince = $('.location-modal-province').first();
			},
			error: function (data, textStatus, jqXHR){
				alert("An error occurred,try again later.")
			},
		});
 	},



 	getCities:function(){
 		$('.location-modal-city').unbind();
 		var cityContainer = $('#location-modal-cityContainer');
 		cityContainer.empty();
 		var self = this;

 		$.ajax({
			type: "GET",
			async: false,
			data: {province : self.provinceName},
			url: "../api/badstudent/v0.9/location",
			dataType: 'json',
			success: function(data){
				for(each in data){

					cityContainer.append(self.cityDOMGenerator(data[each]));
				}
				$('.location-modal-city').bind('click', function(){
					self.cityName = $(this).html();
					self.getUniversities(self.cityName);

					self.highLight($(this),"city");
					self.highLightedCity = $(this);
				});

				self.cityName = $('.location-modal-city').first().html();
				self.getUniversities();
				self.highLight($('.location-modal-city').first(),"city");
				self.highLightedCity = $('.location-modal-city').first();
			},
			error: function (data, textStatus, jqXHR){
				alert("An error occurred,try again later.")
			},
		});
 	},

 	getUniversities:function(){
 		$('.location-modal-university').unbind();
 		var universityContainer = $('#location-modal-universityContainer');
 		universityContainer.empty();
 		var self = this;

 		$.ajax({
				type: "GET",
				async: false,
				data: { province: self.provinceName, city: self.cityName },
				url: "../api/badstudent/v0.9/location",
				dataType: 'json',
				success: function(data){
					for(each in data){
						universityContainer.append(self.universityDOMGenerator(data[each])); 
					}

					$('.location-modal-university').bind('click', function(){
						self.universityName = $(this).html();
						self.complete();
						self.highLight($(this));
					});

					self.universityName = $('.location-modal-university').first().html();

				},
				error: function (data, textStatus, jqXHR){
					alert("An error occurred,try again later.");
				},
		 	});
 	},

 	provinceDOMGenerator:function(province){
 		return "<div class = 'location-modal-province location-modal-entry' id = >" + province + "</div>";
 	},

	cityDOMGenerator:function(city){
		return "<div class = 'location-modal-city location-modal-entry'>" + city + "</div>";
 	},

 	universityDOMGenerator:function(university){
 		return "<div class = 'location-modal-university location-modal-entry'>" + university + "</div>";
 	}, 	

 	complete:function(){
 		this.locationArray[0] = this.provinceName;
 		this.locationArray[1] = this.cityName;
 		this.locationArray[2] = this.universityName;

 		this.initiator.updateLocation();
 		this.close();
 	},

 	close:function(){
 		togglePopup("locationSearchPanel");
 		$('#location-modal-closeButton').unbind();
 		$('.location-modal-province').unbind();
 		$('.location-modal-city').unbind();
 		$('.location-modal-university').unbind();
		$('#locationSearchPanel').empty();
 		$('#locationSearchPanel').remove();
		
		modalOpen = false;
		doubleModalOpen = false;
 		this.unbind();
 		this.remove();
 		

 		Backbone.View.prototype.remove.call(this);
 	},

 	highLight:function(targetDOM, type){
 		if (type == "province"){
 			targetDOM.css({'background-color': '#476CDA'});
 			if (this.highLightedProvince){
 				this.highLightedProvince.css({'background-color': ''});
 			}
 		}
 		else if (type == "city"){
 			targetDOM.css({'background-color': '#476CDA'});
	 		if (this.highLightedCity){
	 			this.highLightedCity.css({'background-color': ''});
	 		}
 		}
 		
 	}




 });