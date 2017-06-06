var theData = d3.csv("USKoreaData.csv",makeStuff);

function makeStuff(theData){

	var NegoMax = 0;
	var ProvMax = 0;
	
	for(var i=0;i<theData.length;i++){
		if(theData[i].Nego>NegoMax){
			NegoMax=theData[i].Nego;
		}
		if(theData[i].Prov>ProvMax){
			ProvMax=theData[i].Prov;
		}
	}
	
	var provColor = d3.scaleQuantize()
    	.domain([0,ProvMax])
    	.range(["#fee5d9","#fcae91","#fb6a4a","#cb181d"]);

    var negoColor = d3.scaleQuantize()
    	.domain([0,NegoMax])
    	.range(["#eff3ff", "#bdd7e7", "#6baed6","#2171b5"]);

	d3.select('#calendar')
		.attr('height','45%')
		.attr('width','100%')
		.selectAll('g')
		.data(theData)
		.enter()
		.append("g")
		.attr("class","row");

	d3.selectAll(".row")
		.append("rect")
		.attr("class","box nego")
		.attr("x",function(d,i){return ((30*i)%360)+35})
		.attr("y",function(d,i){return (15*Math.floor(i/12))+26})
		.attr('width','15')
		.attr('height','15')
		.attr('data',function(d){return d.Date;})
		.attr("fill",function(d){if(d.Nego==0){return "white"} else return negoColor(d.Nego)})
		.text(function(d){return d.Nego;})

	d3.selectAll(".row")
		.append("rect")
		.attr("class","box prov")
		.attr('width','15')
		.attr('height','15')
		.attr("x",function(d,i){return (15+(30*i)%360)+35})
		.attr("y",function(d,i){return (15*Math.floor(i/12))+26})
		.attr("fill",function(d){if(d.Prov==0){return "white"} else return provColor(d.Prov)})
		.text(function(d){return d.Prov;})

	var xScale =  d3.scaleBand()
		.domain(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])
    	.range([0, 360]);
	var xAxis = d3.axisTop(xScale)
				.tickSizeOuter(0);

	d3.select('#calendar')
		.append("g")
		.attr('height','25px')
		.attr("transform", "translate(35,25)")
    	.call(xAxis)
    	.selectAll("text")
    	.attr("transform", "rotate(-45 0,0) translate(0,0) ")
    	.style("text-anchor", "start");

    var yScale =  d3.scaleTime()
		.domain([new Date(1989, 5, 1), new Date(2017, 5, 1)])
    	.range([0, 420]);
	var yAxis = d3.axisLeft(yScale)
				.ticks(8)
				.tickSizeOuter(0);

	d3.select('#calendar')
		.append("g")
    	.call(yAxis)
    	.attr("transform","translate(35,25)")

    	var waypoint = new Waypoint({
    		element: document.getElementById('calendar'),
    		handler: function() {
    			console.log('Basic waypoint triggered')
    		}
})


    windowResize();
}

function getSVGWidth(){
	return document.getElementById('calendar').clientWidth;
}

function getSVGHeight(){
	return document.getElementById('calendar').clientHeight;
}

function windowResize(){
	d3.select("#calendar")
    	.style("position","fixed")
    	.style("left",(window.innerWidth/2)-(getSVGWidth()/2))
    	.style("top","2px");
}

window.onresize = windowResize;