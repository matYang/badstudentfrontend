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
			messageEditView  	    [modal window]					editTemplate.html
			registerView			[modal window]					DOM encoded in JS string
			enterInfoSearchView		[modal window]					DOM encoded in JS string
			locationPickView		[modal window]					DOM encoded in JS string

Controller:	Router::routes:
			""   						:   mainPageView
			message/:id 				:   messageDetailView(id)
			help/*encodedSearchKey 		:   helpSearchResultView
			ask/*encodedSearchKey		:	askSearchResultView 
			info/*encodedSearchKey		:   infoSearchResultView
			no routes for modal windows
			tempSession					:	intermediate session URL used to refresh mesage detail view after success update

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

URL encoding direcetions:
mainPageView -> helpSearchResultView
mainPageView -> askSearchResultView
enterInfoSearchView -> infoSearchResultView
searchResultView -> messageDetalView
regiterView -> messageDetailView
messageEditView -> messageDetailView
messageEditView -> infoSearchResultView


URL modifications:
main URL constants
Message default URLs
LocationPickView location urls for provinces/cities/univerties