//const colors = ["#ff0000", "#0000ff", "#00ffff", "#007bff", "#6610f2", "#6f42c1", "#e83e8c", "#dc3545", "#fd7e14", "#ffc107", "#28a745", "#ac3545", "#6c757d", "#17a2b8", "#20c997", "#233545"];
const colors = ["#4deeea", "#74ee15", "#ffe700", "#f000ff", "#001eff", "#01FFF4", "#FFF205", "#7CFF01", "#05EEff", "#FE6FCF", "#FBB23F", "#00FF00", "#00FFFF", "#9D00FF", "#FF00FF", "#FFFF00"];

// const baseUrl = "/"
const baseUrl = "http://213.133.110.214:6060/";
var brushRightEnd, brushLeftEnd;
let chartHeight = 150;
let chartBtnState = true;
let globalHosts,globalGraphData;
let selectedYRange={},selectedRange=[];
let rangeType;
$(document).ready(function () {

	AjaxRequestGetHosts();

	AjaxRequestGetAuthors();
	$("#search_limit").val(100);

	$('#btnShowSearchOptions').click(function (event) {
		event.preventDefault();
		$('.filter-search').toggleClass('is-hidden');
	});

	$('#submit-search').click(function (event) {
		event.preventDefault();
		var filterSearch = document.getElementById('filter-search');
		filterSearch.classList.add('is-hidden');
      
        $('body').addClass('overflow');
        
		var searchValue = $('#search_query').val();
		var blank_search = $('#blank_search').is(":checked");
		document.getElementById('max-size').classList.add("hidden");
		document.getElementById('min-size').classList.add("hidden");
		if (!blank_search && searchValue.length < 3) {
			alert("search query error, less then 3 char")
			return
		} else {
			var loader = document.getElementById('loader');
			var graph = document.getElementById('graph-response');
			loader.classList.remove("hidden");
			graph.classList.add('hidden');
			getHosts();
		}

		query = $('#search_query').val();
		date_from = $('#date_from').val();
		date_to = $('#date_to').val();
		host = $('#select_host option:selected').text();
		author = $('#input_author').val();
		limit = $('#search_limit').val();
		period = $('#select_Period option:selected').text();
		rangeType =  period;
		var blank_search = $('#blank_search').is(":checked");
		if (!blank_search && query.length < 3) {
			alert("search query error, less then 3 char")
			return
		}

		const date1 = new Date(date_from);
		const date2 = new Date(date_to);

		var timestamp1 = Math.floor(date1.getTime() / 1000);
		var timestamp2 = Math.floor(date2.getTime() / 1000);




		if (isNaN(timestamp1)) {
			timestamp1 = 0
		}
		if (isNaN(timestamp2)) {
			timestamp2 = 0
		}
		var l = parseInt(limit, 10);

		var request = JSON.stringify({ "PublishDateFrom": timestamp1, "PublishDateTo": timestamp2, "Author": author, "Host": host, "Search": query, "TypeOfSearch": "", "MaxResultSize": l });
		AjaxRequestGetSearchResults(request)
	});

	$('#submitblue-search').click(function (event) {
		event.preventDefault();
		var filterSearch = document.getElementById('filter-search');
		filterSearch.classList.add('is-hidden');
      
        $('body').addClass('overflow');
		var searchValue = $('#search_query').val();
		var blank_search = $('#blank_search').is(":checked");
		document.getElementById('max-size').classList.add("hidden");
		document.getElementById('min-size').classList.add("hidden");
		if (!blank_search && searchValue.length < 3) {
			alert("search query error, less then 3 char")
			return
		} else {
			var loader = document.getElementById('loader');
			var graph = document.getElementById('graph-response');
			loader.classList.remove("hidden");
			graph.classList.add('hidden');
			getHosts();
		}

		query = $('#search_query').val();
		date_from = $('#date_from').val();
		date_to = $('#date_to').val();
		host = $('#select_host option:selected').text();
		author = $('#input_author').val();
		limit = $('#search_limit').val();
		period = $('#select_Period option:selected').text();
		rangeType =  period;
		var blank_search = $('#blank_search').is(":checked");
		if (!blank_search && query.length < 3) {
			alert("search query error, less then 3 char")
			return
		}

		const date1 = new Date(date_from);
		const date2 = new Date(date_to);

		var timestamp1 = Math.floor(date1.getTime() / 1000);
		var timestamp2 = Math.floor(date2.getTime() / 1000);




		if (isNaN(timestamp1)) {
			timestamp1 = 0
		}
		if (isNaN(timestamp2)) {
			timestamp2 = 0
		}
		var l = parseInt(limit, 10);

		var request = JSON.stringify({ "PublishDateFrom": timestamp1, "PublishDateTo": timestamp2, "Author": author, "Host": host, "Search": query, "TypeOfSearch": "", "MaxResultSize": l });
		AjaxRequestGetSearchResults(request)
	});

	$('#submit-word-graph-search').click(function (event) {
		event.preventDefault();
		query = $('#search_query').val();

		query = $('#search_query').val();
		date_from = $('#date_from').val();
		date_to = $('#date_to').val();
		host = $('#select_host option:selected').text();
		author = $('#input_author').val();
		limit = $('#search_limit').val();
		period = $('#select_Period option:selected').text();

		if (query.length < 3) {
			alert("search query error, less then 3 char")
			return
		}

		const date1 = new Date(date_from);
		const date2 = new Date(date_to);

		var timestamp1 = Math.floor(date1.getTime() / 1000);
		var timestamp2 = Math.floor(date2.getTime() / 1000);




		if (isNaN(timestamp1)) {
			timestamp1 = 0
		}
		if (isNaN(timestamp2)) {
			timestamp2 = 0
		}
		var l = parseInt(limit, 10);
		var request = JSON.stringify({ "PublishDateFrom": timestamp1, "PublishDateTo": timestamp2, "Author": author, "Host": host, "Search": query, "OutOut": "csv", "Period": period });
		AjaxRequestGetGraphCSV(request, query);

	});
});

function AjaxRequestGetHosts() {
	jQuery(function ($) {
		$.ajax({ //ajax request
			type: "POST",
			dataType: "json",
			url: `${baseUrl}get_hosts`,
			data: "",
			success: function (data) {

				$('#select_host').append($("<option />").val(i).text(""));
				for (var i = 0; i < data.length; i++) {
					$('#select_host').append($("<option />").val(i).text(data[i]));
				}
			},
			error: function (errorThrown) {

				//LogError(errorThrown);
				console.log("there is an error!!!");
				console.log(errorThrown);
			}
		});
	});
}

function AjaxRequestGetAuthors() {
	jQuery(function ($) {
		$.ajax({ //ajax request
			type: "POST",
			dataType: "json",
			url: `${baseUrl}get_authors`,
			data: "",
			success: function (data) {
				$('#select_author').append($("<option />").val(i).text(""));
				for (var i = 0; i < data.length; i++) {
					$('#select_author').append($("<option />").val(i).text(data[i]));
				}
			},
			error: function (errorThrown) {
				//LogError(errorThrown);
				console.log("there is an error!!!");
				console.log(errorThrown);
			}
		});
	});
}

function AjaxRequestGetSearchResults(request) {
	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp * 1000);
		var year = a.getFullYear();
		var month = a.getMonth() + 1;
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		if (hour + min + sec > 0) {
			var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec;
			return time;
		} else {
			var time = date + '.' + month + '.' + year;
			return time;
		}
		return time;
	}
	jQuery(function ($) {
		$.ajax({ //ajax request
			type: "POST",
			dataType: "json",
			url: `${baseUrl}search`,
			data: request,
			success: function (data) {
				//console.log(data)
				$('#search-response').empty();
				var text = "<p><span>Results: " + data.count + "</span></p>";
//				var text = "<p><span>All matches: " + data.count + "</span></p>";
//				text += "<p><span>Filtered: " + data.count_filtered + "</span><p>";
				text += "<hr hidden>";
              
				for (var i = 0; i < data.results.length; i++) {
                  text += "<div class='block__ not__see'>";
                  
                  // images
                    text += "<div class='post__preview'><a href='javascript:;'><img src='assets/img/post__img.png' alt='post__img'></a></div>";
                  
                   text += "<div class='box_response__'>";
					text += "<a class='result-url' href='" + data.results[i].url + "'>" + data.results[i].url + "</a>";
                  
					text += "<a class='result-title' href='" + data.results[i].url + "'>" + data.results[i].title + "</a>";

					q = data.results[i].quote.replaceAll(';', '</br>')
					text += "<div class='result-quote'>" + q + "</div>";
                  
                  
                  
                  text += "<div class='box__bottom'><div class='box__navigation'><a class='icon__ like' href='javascript:;'></a><a class='icon__ dislike' href='javascript:;'></a><a class='icon__ star' href='javascript:;'></a><a class='icon__ broom' href='javascript:;'></a></div>";
                  
                  
                  
                  					var date = timeConverter(data.results[i].date);
					text += "<div class='result-date'>" + date + "</div>";                 
                  
                  text += "</div>";
                  
					text += "</div></div>";
				}
				$('#search-response').append(text);
                $('body').removeClass('overflow');
                $('.section__dashboard>div.pinned').remove();
                $('.section__tab').removeClass('none');
                $('.section__search__list').removeClass('none');
                $('.section__dashboard').addClass('search');
                $('.filter-search').addClass('none');
              
              
			},
			error: function (errorThrown) {
				//LogError(errorThrown);
				console.log("there is an error!!!");
				console.log(errorThrown);
			}
		});
	});
}

function AjaxRequestGetGraphCSV(request, query) {

	const saveData = (function () {
		const a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		return function (data, fileName) {
			const blob = new Blob([data], { type: "octet/stream" }),
				url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		};
	}());

	jQuery(function ($) {
		$.ajax({ //ajax request
			type: "POST",
			xhrFields: {
				responseType: "blob", // to avoid binary data being mangled on charset conversion
			},
			url: `${baseUrl}graph_search`,
			data: request,
			success: function (blob, status, xhr) {
				saveData(blob, "word_graph_" + query.replaceAll(" ", "_") + ".csv");

			},
			error: function (errorThrown) {
				//LogError(errorThrown);
				console.log("there is an error!!!");
				console.log(errorThrown);
			}
		});
	});
}

function getHosts() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var hosts = this.response;
			getData(hosts);
		}
	};
	xhttp.open("POST", `${baseUrl}get_hosts`, true);
	xhttp.responseType = 'json';
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send();
}

function getData(hosts) {
	var searchValue = $('#search_query').val();
	var dateFromValue = $('#date_from').val();
	var dateToValue = $('#date_to').val();
	var period = $('#select_Period option:selected').text();
	var blank_search = $('#blank_search').is(":checked");
	var dateFrom = new Date(dateFromValue);
	var dateTo = new Date(dateToValue);
	var dateFromSecond = Math.floor(dateFrom.getTime() / 1000);
	var dateToSecond = Math.floor(dateTo.getTime() / 1000);
	if (isNaN(dateFromSecond)) { dateFromSecond = 0 }
	if (isNaN(dateToSecond)) { dateToSecond = 0 }

	var jsonData = JSON.stringify({ "PublishDateFrom": dateFromSecond, "PublishDateTo": dateToSecond, "Author": "", "Host": "", "Search": searchValue, "OutOut": "json", "Period": period });
	if (blank_search) {
		var jsonData = JSON.stringify({ "PublishDateFrom": dateFromSecond, "PublishDateTo": dateToSecond, "Author": "", "Host": "", "Search": searchValue, "OutOut": "json", "Period": period, "AllHosts": "All" });

	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var graphData = this.response;
			var loader = document.getElementById('loader');
			var graph = document.getElementById('graph-response');
			loader.classList.add("hidden");
			graph.classList.remove('hidden');
			document.getElementById('max-size').classList.remove("hidden")
			graph.innerHTML = '';
			globalHosts = hosts;
			globalGraphData = graphData;
			setGraph(hosts, graphData);
            $('.section__news').addClass('none');
          
		}
	};
	xhttp.open("POST", `${baseUrl}graph_search`, true);
	xhttp.responseType = 'json';
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(jsonData);
}

function setSize()
{
	d3.select("#graph-response").selectAll("*").remove();
	chartHeight = chartHeight == 400 ?  150 : 400;
	chartBtnState = !chartBtnState;
    showIcon();
	setGraph(globalHosts , globalGraphData);
}

function showIcon()
{
	var maxIcon = document.getElementById('max-size');
	var minIcon = document.getElementById('min-size');
	if(chartBtnState)
	 {
		maxIcon.classList.remove("hidden");
		minIcon.classList.add("hidden");
	 }
	 else
	 {
		maxIcon.classList.add("hidden");
		minIcon.classList.remove("hidden");
	 }
}

function calculatePeriod(data,key)
{ 
	var total = 0;
	Object.keys(data).map((item) => {
		 total += Number(data[item])
	})
	return  Math.round(Number(data[key])/total*100 * 10) / 10;
}

function calculateTotal(data,key)
{ 
	 var allBarTotal=0,singleBarTotal=0;
    for(let i=0;i<selectedRange.length; i++)
	{
		Object.keys(selectedYRange[selectedRange[i]]).map((obj) => {
			allBarTotal += selectedYRange[selectedRange[i]][obj] === undefined ? 0 : selectedYRange[selectedRange[i]][obj];
		})	
	}		
	Object.keys(data).map((item) => {
		 var val = Number(data[item]);
		 singleBarTotal += Number(val);
    })
	return  Math.round(singleBarTotal / allBarTotal *100 * 10) / 10;
}
// $('#chart-resize').click(function (event) {
// 	alert("button was clicked",event);
// })


function setGraph(hosts, graphData) {
	showIcon();
	container_width = $('#graph-container').width();
	var margin = { top: 30, right: 50, bottom: 40, left: 50 };
	var margin2 = { top: 100, right: 50, bottom: 50, left: 10 };
	var width = container_width - margin.left - margin.right;
	var height = chartHeight - margin.top - margin.bottom;
	var svg = d3.select("#graph-response")
		.append("svg")
		.attr("viewBox", `0 15 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");	
	var height2 = margin2.top - margin2.bottom;	
	var svgBottom = d3.select("#graph-response")
			.append("svg")
			.attr("class",function(d){
				 return  !chartBtnState ? "show" : "hidden"
			})
			.attr("width", width + margin.left + margin.right)
			.attr("height", height2 + margin2.bottom)
			.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");			

	var tooltip = d3.select('#graph-response').append("div").attr("id", "tooltipdata").style("position", "absolute");



	svg.append("defs").append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", width)
		.attr("height", height);

	var subgroups = hosts;
	var groups = Object.keys(graphData);
	brushRightEnd  = groups[groups.length - 1];  // last element of the group
	brushLeftEnd = groups[groups.length - Math.floor((1 / 5) * groups.length)]; 
	var x = d3.scaleBand()
		.domain(groups)
		.range([0, width])
		.padding([0.2])
	svg.append("g")
		.attr("class", "x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x)
		.tickValues(x.domain().filter((d, i) => {
			const value = Math.floor(groups.length / (groups.length > 15 ?  Math.floor((1 / 2) * groups.length) : groups.length ))
			return i % value === 0;
		}))
		)
		.selectAll("text")
		.style("text-anchor", "middle");
	var xAxisData = x.domain();

	var x1 = d3.scaleBand()
		.domain(groups)
		.range([0, width])
		.padding([0.2])

    svgBottom.append("g")
		.attr("transform", "translate(" + margin2.left + "," +  margin2.bottom + ")")
		.call(d3.axisBottom(x1)
		.tickValues(x1.domain().filter((d, i) => {
			const value = Math.floor(groups.length / 5)
			return i % value === 0;
		}))
		)
		.selectAll("text")
		.style("text-anchor", "middle");

	let xAxisGeneratorTop = d3.axisBottom(x);
	xAxisGeneratorTop.tickSize(15);
	let xAxisGeneratorBottom = d3.axisBottom(x1);
	xAxisGeneratorBottom.tickSize(5);
	var limit = getMaxValue(hosts, graphData);

	var y = d3.scaleLinear().domain([0, limit]).range([height, 0]);
	svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y).ticks(5));
	var y2 = d3.scaleLinear().domain([0, limit]).range([height2, 0]);

	var color = d3.scaleOrdinal()
		.domain(subgroups)
		.range(d3.schemeSet2);

	var stack = [];
	groups.map((item) => {
		stack.push(graphData[item]);
	});

	var stackedData = d3.stack()
		.keys(subgroups)
		.value(function (d, key) {
			let value = d[key] == undefined ? 0 : d[key];
			return (value)
		})(stack)

	var mouseover = function (xvalue, yvalue, bardata , self  ) {
		setTimeout(() => {
			var subgroupName = d3.select(self.parentNode).datum().key;
		d3.selectAll(".rect").style("opacity", 0.2);
		d3.selectAll("." + subgroupName.split('.')[0]).style("opacity", 1);
		}, 300);
		tooltip
			.transition(200)
			.style('opacity', 1)
		tooltip.style("opacity", 1);
		tooltip.style("top", `${y(yvalue) - 250 + margin.top +margin.bottom}px`);
		tooltip.style("left", function(d){
					return `${ x(xvalue) - 125  + margin.left  + x.bandwidth()/2  }px`
		});
		d3.select('#graph-response').select("div").selectAll("*").remove();
		tooltip.html(`
<div class="tooltip">
<div class="tooltip-body">
<p class="mean" style="border-left: 3px solid ${document.getElementById(d3.select(self.parentNode).datum().key).childNodes[1].style.backgroundColor};!important">
<span><b>${d3.select(self.parentNode).datum().key}</b></span></p>
<div class="tooltip-divider"></div>
<p class="mean">
<span>${xvalue}</span>
 <span><b>${(bardata[d3.select(self.parentNode).datum().key]) > 10000 ? (bardata[d3.select(self.parentNode).datum().key]).toLocaleString('de-DE') : (bardata[d3.select(self.parentNode).datum().key])}</b></span>
</p>
<div class="tooltip-divider"></div>
<p class="mean">
<span>Period </span>
 <span><b>${calculatePeriod(bardata , d3.select(self.parentNode).datum().key).toString().replace(".",",")+"%"}</b></span>
</p>
<div class="tooltip-divider"></div>
<p class="mean">
<span>Total </span>
 <span><b>${calculateTotal(bardata , d3.select(self.parentNode).datum().key).toString().replace(".",",")+"%"}</b></span>
</p>
</div>
</div>`)
	}

	var mouseleave = function (d) {
		d3.selectAll(".rect").style("opacity", 0.8);
		tooltip.style("opacity", 0);

	}

	///////// Brush Code Started
	var inverseModeScale = d3.scaleQuantize()
		.domain(x1.range())
		.range(x1.domain());
	var brush = d3.brushX()
		.extent([[0, 0], [width, height2]])
		.on("brush end", brushed);

	function brushed() {
		if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
		var s = d3.event.selection || x1.range();
		selectedRange = [];
		for (let i = 0; i < xAxisData.length; i++) {
			if(rangeType == "quarter" &&
			(xAxisData[i].split(" ")[0] > inverseModeScale(s[0]).split(" ")[0] || (xAxisData[i].split(" ")[0] == inverseModeScale(s[0]).split(" ")[0] && xAxisData[i].split(" Q")[1] >= inverseModeScale(s[0]).split(" Q")[1]))
			&& (xAxisData[i].split(" ")[0] < inverseModeScale(s[1]).split(" ")[0] || (xAxisData[i].split(" ")[0] == inverseModeScale(s[1]).split(" ")[0] && xAxisData[i].split(" Q")[1] <= inverseModeScale(s[1]).split(" Q")[1])))
				selectedRange.push(xAxisData[i]);
		    else if(rangeType == "month" && (xAxisData[i].split("-")[0] > inverseModeScale(s[0]).split("-")[0] || (xAxisData[i].split("-")[0] == inverseModeScale(s[0]).split("-")[0] && xAxisData[i].split("-")[1] >= inverseModeScale(s[0]).split("-")[1]))
			&& (xAxisData[i].split("-")[0] < inverseModeScale(s[1]).split("-")[0] || (xAxisData[i].split("-")[0] == inverseModeScale(s[1]).split("-")[0] && xAxisData[i].split("-")[1] <= inverseModeScale(s[1]).split("-")[1])))
				selectedRange.push(xAxisData[i])	
				else if(rangeType == "week" && 
				(xAxisData[i].split(" ")[0] > inverseModeScale(s[0]).split(" ")[0] || (xAxisData[i].split(" ")[0] == inverseModeScale(s[0]).split(" ")[0] && xAxisData[i].split(" W")[1] >= inverseModeScale(s[0]).split(" W")[1]))
			&& (xAxisData[i].split(" ")[0] < inverseModeScale(s[1]).split(" ")[0] || (xAxisData[i].split(" ")[0] == inverseModeScale(s[1]).split(" ")[0] && xAxisData[i].split(" W")[1] <= inverseModeScale(s[1]).split(" W")[1])))
				selectedRange.push(xAxisData[i]);
				else if(rangeType == "day" &&
				 new Date(xAxisData[i]).getTime() >= new Date(inverseModeScale(s[0]))
				 && new Date(xAxisData[i]).getTime() <= new Date(inverseModeScale(s[1]))
				 )
				selectedRange.push(xAxisData[i]);
				
		
			}
		groups = selectedRange.length > 0 ? selectedRange : xAxisData;
		selectedRange = sortData(selectedRange);
		x.domain(selectedRange);
		svg.select('.x-axis').call(d3.axisBottom(x)
		.tickValues(x.domain().filter((d, i) => {
			const value = Math.floor(groups.length / (groups.length > 15 ?  Math.floor((1 / 2) * groups.length) : groups.length ))
			return i % value === 0;
		}))
		)
		xAxisGeneratorTop.tickSize(15);
		selectedYRange={};
		 Object.keys(graphData).map((item) => {
			 if(rangeType == "quarter" &&
			 (item.split(" ")[0] > inverseModeScale(s[0]).split(" ")[0] || (item.split(" ")[0] == inverseModeScale(s[0]).split(" ")[0] && item.split(" Q")[1] >= inverseModeScale(s[0]).split(" Q")[1]))
			 && (item.split(" ")[0] < inverseModeScale(s[1]).split(" ")[0] || (item.split(" ")[0] == inverseModeScale(s[1]).split(" ")[0] && item.split(" Q")[1] <= inverseModeScale(s[1]).split(" Q")[1])))
				selectedYRange[item] = graphData[item];
		    else if(rangeType == "month" &&
			(item.split("-")[0] > inverseModeScale(s[0]).split("-")[0] || (item.split("-")[0] == inverseModeScale(s[0]).split("-")[0] && item.split("-")[1] >= inverseModeScale(s[0]).split("-")[1]))
			&& (item.split("-")[0] < inverseModeScale(s[1]).split("-")[0] || (item.split("-")[0] == inverseModeScale(s[1]).split("-")[0] && item.split("-")[1] <= inverseModeScale(s[1]).split("-")[1])))
			   selectedYRange[item] = graphData[item];
			else if(rangeType == "week" &&
			(item.split(" ")[0] > inverseModeScale(s[0]).split(" ")[0] || (item.split(" ")[0] == inverseModeScale(s[0]).split(" ")[0] && item.split(" W")[1] >= inverseModeScale(s[0]).split(" W")[1]))
			&& (item.split(" ")[0] < inverseModeScale(s[1]).split(" ")[0] || (item.split(" ")[0] == inverseModeScale(s[1]).split(" ")[0] && item.split(" W")[1] <= inverseModeScale(s[1]).split(" W")[1])))
			   selectedYRange[item] = graphData[item];  
			   else if(rangeType == "day" &&
			   new Date(item).getTime() >= new Date(inverseModeScale(s[0]))
			   && new Date(item).getTime() <= new Date(inverseModeScale(s[1])))
			   selectedYRange[item] = graphData[item];  
			})
		limit = getMaxValue(globalHosts, selectedYRange);
		y.domain([0, limit]);
		svg.select('.y-axis').call(d3.axisLeft(y).ticks(5));
		svg.selectAll(".bar")
			.attr("x", function (d, index) {
				var valuex = x(d3.select(this).attr("xval"))
				return valuex == undefined ? -5000 : valuex;
			})
			.attr("y", function (d) { return y(d[1]); })
			.attr("height", function (d) { return y(d[0]) - y(d[1]); })
			.attr("width", x.bandwidth())
			.on("mouseover", function (d, index) {
				var xVal = d3.select(this).attr("xval");
				var yVal = d[1];
				mouseover(xVal, yVal, d.data , this);
			})
			.on("mouseleave", mouseleave);
	}

	function sortData(data)
	{
		if(rangeType == "quarter")
		{
			data.sort(function (a,b) {
				var fisrtNumber = a.split(' Q'),
				    secondNumber = b.split(' Q');
				return fisrtNumber[0] - secondNumber[0] || (fisrtNumber[1] || -Infinity) - (secondNumber[1] || -Infinity);
			})
		}
		else if(rangeType == "month")
		{
			data.sort(function (a,b) {
				var fisrtNumber = a.split('-'),
				    secondNumber = b.split('-');
				return fisrtNumber[0] - secondNumber[0] || (fisrtNumber[1] || -Infinity) - (secondNumber[1] || -Infinity);
			})
		}
		else if(rangeType == "week")
		{
			data.sort(function (a,b) {
				var fisrtNumber = a.split(' W'),
				    secondNumber = b.split(' W');
				return fisrtNumber[0] - secondNumber[0] || (fisrtNumber[1] || -Infinity) - (secondNumber[1] || -Infinity);
			})
		}
		else if(rangeType == "day")
		{
			data.sort(function (a,b) {
				var fisrtDate = new Date(a).getTime(),
				    secondDate = new Date(b).getTime();
				return fisrtDate > secondDate;
			})
		}
		return data;
	}




	svg.append("g")
		.selectAll("g")
		.data(stackedData)
		.enter().append("g")
		.attr("fill", function (d) {
			var index = hosts.indexOf(d.key);
			return colors[index];
		})
		.attr("class", function (d) { return "groups rect " + d.key.split('.')[0]; })
		.selectAll("rect")
		.data(function (d) { return d; })
		.enter().append("rect")
		.attr("class", "bar")
		.attr("xval", function (d, index) {
			return groups[index]
		})
		.attr("yval", function (d, index) {
			return d[1]
		})
		.attr("x", function (d, index) { return x(groups[index]); })
		.attr("y", function (d) { return y(d[1]); })
		.attr("height", function (d) { return y(d[0]) - y(d[1]); })
		.attr("width", x.bandwidth())
		.attr("stroke", "grey")
		.style("opacity", 0.5)
		.on("mouseover", function (d, index) {
			var xVal = d3.select(this).attr("xval");
			var yVal = d[1]
			mouseover(xVal, yVal, d.data , this);
		})
		.on("mouseleave", mouseleave);

	// var brushSvg = svgBottom.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
	svgBottom
		.selectAll("g")
		.data(stackedData)
		.enter().append("g")
		.attr("fill", function (d) {
			var index = hosts.indexOf(d.key);
			return colors[index];
		})
		.selectAll("rect")
		.data(function (d) { return d; })
		.enter().append("rect")
		.attr("x", function (d, index) { return x1(groups[index]); })
		.attr("y", function (d) { return y2(d[1]); })
		.attr("height", function (d) { return y2(d[0]) - y2(d[1]); })
		.attr("width", x.bandwidth())
		// .attr("stroke", "grey")
		.style("opacity", 0.5)

	svgBottom.append("g")
		.attr("class", "brush")
		.attr("transform", "translate(" + margin2.left + "," +  0 + ")")
		.call(brush)
		.call(brush.move,  [brushLeftEnd, brushRightEnd].map(x));
  

	var hostGroups = document.getElementById('host-groups');
	hostGroups.innerHTML = addElement(hosts)

}

function getMaxValue(hosts, graphData) {
	var maxValue = 0;

	Object.keys(graphData).map((item) => {
		var total = 0;
		hosts.map(host => {
			var value = graphData[item][host] === undefined ? 0 : graphData[item][host];
			total += value;
		});
		if (total > maxValue) maxValue = total;
	})

	var value = maxValue / Math.pow(7, `${maxValue}`.length - 1);
	return (value + 1) * Math.pow(7, `${maxValue}`.length - 1);
}

function onChangeFromTime(event) {
	var fromDateEle = document.getElementById('date_from');
	var toDateEle = document.getElementById('date_to');

	var dateFromValue = event.target.value;
	var dateToValue = $('#date_to').val();

	var dateFrom = new Date(dateFromValue);
	var dateTo = new Date(dateToValue);

	var dateFromSecond = Math.floor(dateFrom.getTime() / 1000);
	var dateToSecond = Math.floor(dateTo.getTime() / 1000);
	if (isNaN(dateToSecond)) {
		dateToSecond = dateFromSecond;
		toDateEle.value = event.target.value;
	}

	if (dateFromSecond > dateToSecond) {
		fromDateEle.value = toDateEle.value;
	} else {
		fromDateEle.value = event.target.value;
	}

	selectPeriod();

}

function onChangeToTime(event) {
	var fromDateEle = document.getElementById('date_from');
	var toDateEle = document.getElementById('date_to');

	var dateFromValue = $('#date_from').val();
	var dateToValue = event.target.value;

	var dateFrom = new Date(dateFromValue);
	var dateTo = new Date(dateToValue);

	var dateFromSecond = Math.floor(dateFrom.getTime() / 1000);
	var dateToSecond = Math.floor(dateTo.getTime() / 1000);
	if (isNaN(dateFromSecond)) {
		dateFromSecond = dateToSecond;
		fromDateEle.value = event.target.value;
	}

	if (dateFromSecond > dateToSecond) {
		toDateEle.value = fromDateEle.value;
	} else {
		toDateEle.value = event.target.value;
	}

	selectPeriod();
}

function diffTime() {
	var dateFromValue = $('#date_from').val();
	var dateToValue = $('#date_to').val();

	var dateFrom = new Date(dateFromValue);
	var dateTo = new Date(dateToValue);
	var dateFromSecond = Math.floor(dateFrom.getTime() / 1000);
	var dateToSecond = Math.floor(dateTo.getTime() / 1000);

	if (isNaN(dateFromSecond)) { dateFromSecond = 0 }
	if (isNaN(dateToSecond)) { dateToSecond = 0 }

	var diffDays = (dateToSecond - dateFromSecond) / 3600 / 24;
	return diffDays;
}

function selectPeriod() {
	document.querySelectorAll("#select_Period option").forEach(opt => {
		var $select_Period = document.querySelector('#select_Period');
		opt.disabled = false;
		if (diffTime() <= 365 * 3) {
			if (opt.value == "quarter") {
				opt.disabled = true;
				$select_Period.value = "month";
			}
		}
		if (diffTime() <= 90) {
			if (opt.value == "month") {
				opt.disabled = true;
				$select_Period.value = "week";
			}
		}
		if (diffTime() <= 30) {
			if (opt.value == "week") {
				opt.disabled = true;
				$select_Period.value = "day";
			}
		}
	});
}

function addElement(hosts) {
	var element = '';
	hosts.map((item, index) => {
		element += `<div id="${item}" class="flex host" style="display:none">
			<div class="square" style="background-color: ${colors[index]}"></div>
			<div style="font-weight: bold;">${item}</div>
		</div>`
	});
	return element;
}
