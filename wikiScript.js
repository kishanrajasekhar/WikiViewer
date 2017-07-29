// api information from https://www.mediawiki.org/wiki/API:Search

// base_url is used to access the api date (in json format). A query
// needs to be appended to it, which is done in the 
// displaySearchResults function
var base_url = "https://en.wikipedia.org/w/api.php?action=query&list=search&&utf8=&format=json&callback=?&srsearch=";

// base_redirect is the regular url to the wikipedia page. After 
// appending the title of the wikipedia article, clicking this
// link will direct the user to that wikipedia page.
var base_redirect = "https://en.wikipedia.org/wiki/";

// This function is called when the user presses
// the "Search" button after typing in the query.
// The query is retrieved from the search box and
// passed in the displaySearchResults function.
function searchQuery(){
	// clear the previous search results
	$("#content").html("");
	// get the query from the search box
	var query = $("#searchBox").val().replace(" ", "%20");
	displaySearchResults(query);
	// clear search box for next query
	$("#searchBox").val("");
}

// Displays the wiki search results from the 
// user's query by parsing the json from the
// wikipedia API. Any old search results will
// be replaced by the new results. Each result
// has a hyperlinked to the actual wikipedia page.
function displaySearchResults(query){
	// create the complete url
	var wiki_url = base_url + query;
	console.log(wiki_url);
	$.getJSON(wiki_url, function(json){
		var result = json["query"]["search"];
		for(var i=0; i<result.length; i++){
			console.log(result[i]);
			url_link = base_redirect + result[i].title.replace(" ", "%20");
			$("#content").append("<a href='" + url_link + "' class='list-group-item' target='_blank'><h3>"
			+ result[i].title + "</h3><br>" + result[i].snippet  + "<br></a>");
		}
	});
	
}