// api information from https://www.mediawiki.org/wiki/API:Search

var base_url = "https://en.wikipedia.org/w/api.php?action=query&list=search&&utf8=&format=json&callback=?&srsearch=";
//var base_redirect = "https://en.wikipedia.org/?";
var base_redirect = "https://en.wikipedia.org/wiki/";

//
function searchQuery(){
	// clear the previous search results
	$("#content").html("");
	// get the query from the search box
	var query = $("#searchBox").val().replace(" ", "%20");
	displaySearchResults(query);
}

function displaySearchResults(query){
	// create the complete url
	var wiki_url = base_url + query;
	console.log(wiki_url);
	$.getJSON(wiki_url, function(json){
		var result = json["query"]["search"];
		for(var i=0; i<result.length; i++){
			console.log(result[i]);
			url_link = base_redirect + result[i].title.replace(" ", "%20");
			$("#content").append("<h3> <a href='" + url_link + "' target='_blank'>" + result[i].title + "</a></h3><br>");
			$("#content").append(result[i].snippet  + "<br>");
		}
	});
}

function test(){	
	query = "Albert%20Einstein";
	
	//var test_url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Albert%20Einstein&utf8=&format=json&callback=?";	
	var test_url = base_url + query;
	
	$.getJSON(test_url, function(json){
		var result = json["query"]["search"];
		for(var i=0; i<result.length; i++){
			$("#content").append("<h3>" + result[i].title + "</h3><br>");
			$("#content").append(result[i].snippet  + "<br>");
		}
		
		/*
		jQuery.each(content, function (){
			var result_text = this["revisions"][0]["*"];
			$("#content").html(result_text);
		});
		$("#content").html(content);
		var newDoc = document.open("text/html", "replace");
		newDoc.write(content);
		newDoc.close();*/
	});
}