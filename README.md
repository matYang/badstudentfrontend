badstudentfrontend
==================

the heavy js front end of the badstudent

Model:	  	Message  &  Collection: Messages

View:  	  	mainPageView								Require:	index.html   searchResultView
			helpSearchResultView									searchResultView 			 [part of DOM can be injected into js]
			askSearchResultView										same 						 [part of DOM can be injected into js]
			infoSearchResultView									same   						 [part of DOM can be injected into js]
			searchResultView										resultsTemplate.html						
			messageDetailView										detailTemplate.html        
			messageEditView  	    [modal window]					editTemplate.html			 [can be replaced by pure js]
			registerView			[modal window]					registerTemplate.html		 [can be replaced by pure js]
			enterInfoSearchView		[modal window]					infoSearchTemplate.html		 [can be replaced by pure js]
			locationPickView		[modal window]					DOM encoded in JS string

Controller:	Router::routes:
			""   						:   mainPageView
			message/:id 				:   messageDetailView(id)
			help/*UrlEncodedSearchKey 	:   helpSearchResultView
			ask/*UrlEncodedSearchKey	:	askSearchResultView 
			info/*UrlEncodedSearchKey	:   infoSearchResultView
			no routes for modal windows

API usage:																		Request Type
~/api/badstudent/v0.9/location      	mainPageView							GET
										helpSearchResultView					GET
										askSearchResultView						GET
										messageEditView							GET

~/api/badstudent/v0.9/primarySearch		mainPageView							GET

~/api/badstudent/v0.9/auth				messageDetailView						GET*

~/api/badstudent/v0.9/messages			Model Message & Collection Messages		GET | POST

~/api/badstudent/v0.9/messages/{id}		Model Message & Collection Messages		GET | PUT | DELETE

~/api/badstudent/v0.9/recentsSearch		mainPageView							GET
