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
 		this.firstLoad = true;
 		this.render();
 	},

 	render:function(){
 		$('body').append("<div class='popupPanel' id='locationSearchPanel'></div>");
 		$('#locationSearchPanel').append("<div id='popupBoxLocation'></div>");
 		$('#popupBoxLocation').append("<div class='popUpCloseButton' id='location-modal-closeButton'></div>");
 		$('#popupBoxLocation').append("<div id='location-modal-titleContainer'><p>请选择大学</p><div></div></div>");
 		$('#popupBoxLocation').append("<div id='location-modal-provinceContainer'></div>");
 		$('#popupBoxLocation').append("<div id='location-modal-cityContainer'></div>");
 		$('#popupBoxLocation').append("<div id='location-modal-universityContainer'></div>");
 		
 		$('#location-modal-closeButton').bind('click', this.close);
 		this.getProvinces();
 		this.getCities();
 		this.getUniversities();
 		togglePopup("locationSearchPanel");
 	},

 	getProvinces:function(){
 		var provinceContainer = $('#location-modal-provinceContainer');
 		var self = this;
 		$.ajax({
			type: "GET",
			async: true,
			url: origin + "/api/badstudent/v0.9/location",
			dataType: 'json',
			success: function(data){
				for(eachIndex in data){
					provinceContainer.append(self.provinceDOMGenerator(data[eachIndex]));
				}
				$('.location-modal-province').bind('click', function(){
					self.firstLoad = false;
					var selectedProvince = $(this).html();
					if (selectedProvince != self.provinceName){
						self.provinceName = selectedProvince;
						self.getCities(self.provinceName);
						
						self.highLight($(this),"province");
						self.highLightedProvince = $(this);
					}
				});

				//self.provinceName = $('.location-modal-province').first().html();
				//self.getCities();
				self.highLight($(".location-modal-province:contains(" + self.provinceName +  ")").first(),"province");
				self.highLightedProvince = $(".location-modal-province:contains(" + self.provinceName +  ")").first();
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试")
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
			async: true,
			data: {province : self.provinceName},
			url: origin + "/api/badstudent/v0.9/location",
			dataType: 'json',
			success: function(data){
				for(each in data){

					cityContainer.append(self.cityDOMGenerator(data[each]));
				}
				$('.location-modal-city').bind('click', function(){
					self.firstLoad = false;
					var selectedCity = $(this).html();
					if (selectedCity != self.cityName){
						self.cityName = selectedCity;
						self.getUniversities(self.cityName);

						self.highLight($(this),"city");
						self.highLightedCity = $(this);
					}
					
				});

				
				if (!self.firstLoad){
					self.cityName = $('.location-modal-city').first().html();
					self.getUniversities();
				}
				self.highLight($(".location-modal-city:contains(" + self.cityName +  ")").first(),"city");
				self.highLightedCity = $(".location-modal-city:contains(" + self.cityName +  ")").first();
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试")
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
				async: true,
				data: { province: self.provinceName, city: self.cityName },
				url: origin + "/api/badstudent/v0.9/location",
				dataType: 'json',
				success: function(data){
					var totalDomString = "";
					for(each in data){
						totalDomString += self.universityDOMGenerator(data[each]); 
					}
					universityContainer.append(totalDomString);

					$('.location-modal-university').bind('click', function(){
						self.firstLoad = false;
						self.universityName = $(this).children('span').html();
						self.complete();
						self.highLight($(this));
					});

					self.universityName = $('.location-modal-university').first().html();

				},
				error: function (data, textStatus, jqXHR){
					alert("请稍后再试");
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
 		return "<div class = 'location-modal-university location-modal-entry'><span>" + university + "</span></div>";
 	}, 	

 	complete:function(){
 		this.locationArray[0] = this.provinceName;
 		this.locationArray[1] = this.cityName;
 		this.locationArray[2] = this.universityName;

 		if (supportStorage){
 			var locationString = this.locationArray[0] + " " + this.locationArray[1] + " " + this.locationArray[2];
 			localStorage.locationString = locationString;
 		}

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
 			targetDOM.css({'border-color': 'black'});
 			targetDOM.css({'background-color': '#E4EBF5'});
 			if (this.highLightedProvince){
 				this.highLightedProvince.css({'border-color': 'white'});
 				this.highLightedProvince.css({'background-color': ''});
 			}
 		}
 		else if (type == "city"){
 			targetDOM.css({'border-color': 'black'});
 			targetDOM.css({'background-color': '#E4EBF5'});
	 		if (this.highLightedCity){
 				this.highLightedCity.css({'border-color': 'white'});
 				this.highLightedCity.css({'background-color': ''});
	 		}
 		}
 		
 	}




 });