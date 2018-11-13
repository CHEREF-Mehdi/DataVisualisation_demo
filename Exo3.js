
//margin
var margin = {top: 20, right: 10, bottom: 100, left: 40};
    width = 700 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
	Max_valX=0,Max_valY=0;
	
//define SVG 
var svg= d3.select("body")
			.append("svg")
			.attr("width", width + margin.left + margin.right+100)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			
//define axis
var x_scale = d3.scale.linear().range([0,width]);
var y_scale = d3.scale.linear().range([height,0]);

var x_axis = d3.svg.axis().scale(x_scale).orient("bottom");
var y_axis = d3.svg.axis().scale(y_scale).orient("left").ticks(10);
	
var dataset,dataset2; 

draw();

function GO(){
		svg.selectAll("path").remove();
		svg.selectAll("g").remove();

		dataset=RandomData();
		draw();

};

function getRandomArbitraryX(min, max) {
	if(min>=800) return 800;
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArbitraryY(min, max) {
	if(min>=400) min=350;
	if (min<0) min=0;
    return Math.floor(Math.random() * (max - min) + min);
}

//generate new random data
function RandomData(){
		var dataset = [];

		dataset.push( [getRandomArbitraryX(0,50) ,getRandomArbitraryY(0,250)] );
		if(Max_valX<dataset[0][0]) Max_valX=dataset[0][0];
		if(Max_valY<dataset[0][1]) Max_valY=dataset[0][1];
		
		for(var i=1;i<100;i++){
		
			dataset.push( [getRandomArbitraryX(dataset[i-1][0],getRandomArbitraryX(dataset[i-1][0]+10,dataset[i-1][0]+20)) ,
					getRandomArbitraryY(dataset[i-1][1],getRandomArbitraryY(dataset[i-1][1]-20,dataset[i-1][1]+30))] );
			
			if(Max_valX<dataset[i][0]) Max_valX=dataset[i][0];
			if(Max_valY<dataset[i][1]) Max_valY=dataset[i][1];
		}
		//console.log(Max_valX);
		//console.log(Max_valY);
		
		return dataset;
}


//draw graph
function draw(){
	
	Max_valX=0,Max_valY=0
	
	//get random data
	dataset = RandomData();
	dataset2 = RandomData();
	
	//domain
	x_scale.domain([0, Max_valX]);
	y_scale.domain( [0, Max_valY]);
					
	
		
	//draw axisse	
	svg.append("g")
		.attr("class","x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(x_axis)	
		.append("text")							
		.selectAll("text");		
				
	svg.append("g")
		.attr("class","y axis")
		.call(y_axis)
		.append("text");
		
			
	// Define the line
	var valueline = d3.svg.line()
		.x(function(d) { return x_scale(d[0]); })
		.y(function(d) { return y_scale(d[1]); });
	
	 // Add the valueline path.
    svg.append("path")
        .attr("class", "line")		
        .attr("d", valueline(dataset))		
		.style({
			"stroke": "rgb(252,138,21)",
			"stroke-width" : "2",
			"fill" : "none"			
		});
		
	svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(dataset2))
		.style({
			"stroke": "rgb(73,190,183)",
			"stroke-width" : "2",
			"fill" : "none"			
		});

}
