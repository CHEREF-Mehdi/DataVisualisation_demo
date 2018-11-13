
	
var color = [ "rgb(22,129,183)","rgb(252,138,21)","rgb(25,183,1)","rgb(247,53,31)"];
var data;
	
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


		
d3.csv("data.csv", function(data) {
	
	//domain
	x_scale.domain([1,2,3,4,5,6,7,8,9,10]);
	y_scale.domain( [0, d3.max(data, function(d) { return Math.max(d.data0,d.data1,d.data2,d.data3);} )+10]);
	
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
		
	//blue bars
	svg.append("g").selectAll("rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("height",0)
					.attr("width", 10)
					.attr("y",height)	
					.attr("x", 0)		
					.transition().duration(2000)		
					.delay(function(d,k){return k*200;})
					.attr({
						"x" : function(d,j){ return x_scale(j+1)+3;},
						"y" : function(d){ return y_scale(d.data0);},
						"width" : x_scale.rangeBand()-40,
						"height" :  function(d,j){ return (height - y_scale(d.data0)-1);}
					})
					.style("fill", color[0]);
					
	svg.append("g").selectAll("rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("height",0)
					.attr("width", 10)
					.attr("y",height)	
					.attr("x",0 /*function(d,j){ return x_scale(j+1);}*/)		
					.transition().duration(2000)		
					.delay(function(d,k){return k*200;})
					.attr({
						"x" : function(d,j){ return x_scale(j+1)+11+3;},
						"y" : function(d){ return y_scale(d.data1);},
						"width" : x_scale.rangeBand()-40,
						"height" :  function(d,j){ return (height - y_scale(d.data1)-1);}
					})
					.style("fill", color[1]);
					
	svg.append("g").selectAll("rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("height",0)
					.attr("width", 10)
					.attr("y",height)	
					.attr("x", width)		
					.transition().duration(2000)		
					.delay(function(d,k){return (9-k)*200;})
					.attr({
						"x" : function(d,j){ return x_scale(j+1)+22+3;},
						"y" : function(d){ return y_scale(d.data2);},
						"width" : x_scale.rangeBand()-40,
						"height" :  function(d,j){ return (height - y_scale(d.data2)-1);}
					})
					.style("fill", color[2]);
					
	svg.append("g").selectAll("rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("height",0)
					.attr("width", 10)
					.attr("y",height)	
					.attr("x", width)		
					.transition().duration(2000)		
					.delay(function(d,k){return (9-k)*200;})
					.attr({
						"x" : function(d,j){ return x_scale(j+1)+33+3;},
						"y" : function(d){ return y_scale(d.data3);},
						"width" : x_scale.rangeBand()-40,
						"height" :  function(d,j){ return (height - y_scale(d.data3)-1);}
					})
					.style("fill", color[3]);
					
	//labels
	svg.selectAll("text")
			.data(function(d) { return d3.range(d); })
			.data(data)
			.enter()
			.append("text")
			.text(function(d){return d.data0})
			.attr({
				"x" : function(d,j){ return x_scale(j+1);},		
				"y" : function(d){ return y_scale(d.data0)-1;}
			})
			.style({
				"fill" : "white",	
				"font-size" :"9px"
			})
			.transition().duration(4500)
			.delay(function(d,k){return k*200;})
			.style({
				"fill" : "black",					
			});
			
	//labels
	svg.selectAll("text")
			.data(function(d) { return d3.range(d); })
			.data(data)
			.enter()
			.append("text")
			.text(function(d){return d.data1})
			.attr({
				"x" : function(d,j){ return x_scale(j+1)+14;},		
				"y" : function(d){ return y_scale(d.data1)-1;}
			})
			.style({
				"fill" : "white",	
				"font-size" :"9px"
			})
			.transition().duration(4500)
			.delay(function(d,k){return k*200;})
			.style({
				"fill" : "black",					
			});
	
	//labels
	svg.selectAll("text")
			.data(function(d) { return d3.range(d); })
			.data(data)
			.enter()
			.append("text")
			.text(function(d){return d.data2})
			.attr({
				"x" : function(d,j){ return x_scale(j+1)+22;},		
				"y" : function(d){ return y_scale(d.data2)-1;}
			})
			.style({
				"fill" : "white",	
				"font-size" :"9px"
			})
			.transition().duration(4500)
			.delay(function(d,k){return (9-k)*200;})
			.style({
				"fill" : "black",					
			});
	
	//labels
	svg.selectAll("text")
			.data(function(d) { return d3.range(d); })
			.data(data)
			.enter()
			.append("text")
			.text(function(d){return d.data3})
			.attr({
				"x" : function(d,j){ return x_scale(j+1)+36;},		
				"y" : function(d){ return y_scale(d.data3)-1;}
			})
			.style({
				"fill" : "white",	
				"font-size" :"9px"
			})
			.transition().duration(4500)
			.delay(function(d,k){return (9-k)*200;})
			.style({
				"fill" : "black",					
			});
			
});