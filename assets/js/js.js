

function getArticle(searchTerm, beginYear, endYear, limit){

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "dd83170674244b5fa23b6f8784ecbf99",
	  'q': searchTerm,
	  'begin_date': beginYear + "0101",
	  'end_date': endYear + "0101",
	  'page': limit
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  console.log(result);

	  updateScreen(result)

	}).fail(function(err) {
	  throw err;
	});

}

$(document).on("click", "#submit", function(){
	
	var searchTerm = $("#keyword").val();
	var beginYear = $("#startDate").val().trim();
	var endYear = $("#endDate").val().trim();
	var limit = $("#returnLimit").val();

	// if ( !isNAN(beginYear) ) {
	// 	alert("number");
	// }

	// else {
	// 	alert("NAN");
	// }

	getArticle(searchTerm, beginYear, endYear, limit);
});

function updateScreen(data){
	
	var headline;
	var summary; 
	var link;
	var pubDate;
	var newDiv


	for (var i = 0; i < data.response.docs.length; i++) {

		link = data.response.docs[i].web_url;
		summary = data.response.docs[i].snippet;
		headline = data.response.docs[i].headline.main || "No Headline";
		pubDate = data.response.docs[i].pub_date;

		newDiv = "";
		newDiv = $("<div data-num='"+i+"'>");

		newDiv.append("<h1 class='headline'>" + headline + "</h1>");
		newDiv.append("<a class='link' href='"+link+"'>");
		newDiv.append("<p class='pubDate'>" + pubDate + "</p>");
		newDiv.append("<p class='summary'>" + summary + "</p>");

		$("#results").append(newDiv)
	}
}