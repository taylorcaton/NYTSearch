function getArticle(searchTerm, beginYear, endYear){

	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "dd83170674244b5fa23b6f8784ecbf99",
	  'q': searchTerm,
	  'begin_date': beginYear + "0101",
	  'end_date': endYear + "0101"
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
	
	var searchTerm = $("#startDate").val();
	var beginYear = $("#endDate").val().trim();
	var endYear = $("#keyword").val().trim();
	var			$("#returnLimit").val().trim();

	if ( !isNAN(beginYear) ) {
		alert("number");
	}

	else {
		alert("NAN");
	}

	getArticle(keyword, startDate, endDate);
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
		headline = data.response.docs[i].headline.main;
		pubDate = data.response.docs[i].pub_date;

		newDiv = "";
		newDiv = $("<div data-num='"+i+"'>");
		newDiv.append("<div id='headline'>");
		newDiv.append("<div id='pubDate'>");
		newDiv.append("<div id='link'>");
		newDiv.append("<div id='summary'>");
		
		$("#link").text(link);
		$("#summary").text(summary);
		$("#headline").text(headline);
		$("#pubDate").text(pubDate);

		$("#results").append(newDiv)
	}
}