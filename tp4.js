
//margin
var margin = {top: 20, right: 10, bottom: 100, left: 40};
    width = 700 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
	
//define SVG 
var svg= d3.select("body")
			.append("svg")
			.attr("width", width + margin.left + margin.right+100)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			
//define axis
var x_scale = d3.scale.ordinal().rangeRoundBands([0,width], 0.2 , 0.2);
var y_scale = d3.scale.linear().range([height,0]);

var x_axis = d3.svg.axis().scale(x_scale).orient("bottom");
var y_axis = d3.svg.axis().scale(y_scale).orient("left").ticks(10);

var dataset; 
var color = [ "rgb(22,129,183)","rgb(252,138,21)","rgb(25,183,1)","rgb(247,53,31)"];
var data=[];
data[0]=[80,90,110,120,110,97,80,70,112,103];
data[1]=[60,110,120,110,80,90,90,110,100,83];
data[2]=[80,80,130,120,110,97,80,70,112,103];
data[3]=[70,45,90,120,110,67,40,30,70,50];

	//domain
	x_scale.domain([1,2,3,4,5,6,7,8,9,10]);
	y_scale.domain( [0, d3.max(data, function(d) { return d3.max(d);} )+10]);
	
	//draw axisse	
	svg.append("g")
		.attr("class","x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(x_axis)	
		.append("text")
		.attr("y", 5)
		.attr("x", 650)
		.attr("dx", ".60em")		
		.text("Dataset")				
		.selectAll("text")		
		.style({
			"text-anchor" : "middle",
			"text-fontSize" : "12px",			
		});								
		
				
	svg.append("g")
		.attr("class","y axis")
		.call(y_axis)
		.append("text")
		.attr("y", 5)
		.attr("dy", ".70em")		
		.text("Range")
		.selectAll("text")		
		.style({			
			"text-fontSize" : "10px",			
		});
	

	//*******************************************bars
	for(i=0;i<data.length-2;i++){
		svg.append("g").selectAll("rect")
						.data(data[i])
						.enter()
						.append("rect")
						.attr("height",0)
						.attr("width", 10)
						.attr("y",height)	
						.attr("x", /*function(d,j){ return x_scale(j+1);}*/ 0)		
						.transition().duration(2000)		
						.delay(function(d,k){return k*200;})
						.attr({
							"x" : function(d,j){  return x_scale(j+1)+i*11+3;},
							"y" : function(d,j){ return y_scale(d);},
							"width" : x_scale.rangeBand()-40,
							"height" :  function(d,j){ return (height - y_scale(d)-1);}
						})
						.style("fill", color[i]);
							
	}
	for(i=2;i<data.length;i++){
		svg.append("g").selectAll("rect")
						.data(data[i])
						.enter()
						.append("rect")
						.attr("height",0)
						.attr("width", 10)
						.attr("y",height)	
						.attr("x",width)		
						.transition().duration(2000)		
						.delay(function(d,k){return (9-k)*200;})
						.attr({
							"x" : function(d,j){  return x_scale(j+1)+i*11+3;},
							"y" : function(d){ return y_scale(d);},
							"width" : x_scale.rangeBand()-40,
							"height" :  function(d,j){ return (height - y_scale(d)-1);}
						})
						.style("fill", color[i]);
							
	}
	
	
	////*******************************************labels
	for(i=0;i<data.length;i=i+2){
		
		svg.selectAll("text")
			.data(function(d) { return d3.range(d); })
			.data(data[i])
			.enter()
			.append("text")
			.text(function(d){return d})
			.attr({
				"x" : function(d,j){ return x_scale(j+1)+i*11;},		
				"y" : function(d){ return y_scale(d)-1;}
			})
			.style({
				"fill" : "white",	
				"font-size" :"9px"
			})
			.transition().duration(4000)
			.delay(function(d,k){return k*200;})
			.style({
				"fill" : "black",					
			});
		
	}
	
	for(i=1;i<data.length;i=i+2){
		//labels
		svg.selectAll("text")	
			.data(function(d) { return d3.range(d); })		
			.data(data[i])
			.enter()
			.append("text")
			.text(function(d){return d})
			.attr({
				"x" : function(d,j){ return x_scale(j+1)+i*11+3;},		
				"y" : function(d){ return y_scale(d)-1;}
			})
			.style({
				"fill" : "white",	
				"font-size" :"9px"
			})
			.transition().duration(4000)
			.delay(function(d,k){return (9-k)*200;})
			.style({
				"fill" : "black",					
			});
		
	}