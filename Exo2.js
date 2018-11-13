
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
var r_scale = d3.scale.linear().range([5,20]);

var x_axis = d3.svg.axis().scale(x_scale).orient("bottom");
var y_axis = d3.svg.axis().scale(y_scale).orient("left").ticks(10);

var dataset; 

//get data
d3.csv("info-dataC.csv", function(data) {
	
	dataset = data; 

	//domain
	x_scale.domain(data.map(function(d) { return d.specialite; }));
	y_scale.domain( [0, d3.max(dataset, function(d) { return Math.max(d.nbdemandes1p,d.nbdemandes12p );} )+15 ] );
	r_scale.domain( [0, d3.max(dataset, function(d) { return Math.max(d.nbdemandes1p,d.nbdemandes12p );} ) ] );
					
	
		
	//draw axisse	
	svg.append("g")
		.attr("class","x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(x_axis)	
		.append("text")		
		.attr("y", 5)
		.attr("x", 650)
		.attr("dx", ".60em")		
		.text("Specialité")				
		.selectAll("text")		
		.style({
			"text-anchor" : "middle",
			//"text-fontSize" : "12px",			
		});		
		
		
	svg.append("g")
		.attr("class","y axis")
		.call(y_axis)
		.append("text")
		//.attr("transform", "rotate(-90)")
		.attr("y", 5)
		.attr("dy", ".70em")		
		.text("NBR DMD")
		.selectAll("text")		
		.style({			
			//"text-fontSize" : "10px",			
		});
		
	//draw circles
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")		
		.attr("cy",0)	
		.attr("cx",0)		
		.transition().duration(2000)		
		.delay(function(d,i){return i*200;})
		.attr({
			"cx" : function(d){ return x_scale(d.specialite)+20;},
			"cy" : function(d){ return y_scale(d.nbdemandes1p);},
			"r" : function(d) {  return r_scale(d.nbdemandes1p);}
		})
		.style("fill", function(d,i){return "rgb(252,138,21)"; });
		
	svg.selectAll("circle")
		.data(function(d) { return d3.range(d); })
		.data(data)
		.enter()
		.append("circle")		
		.attr("cy",height)	
		.attr("cx", 0)		
		.transition().duration(2000)		
		.delay(function(d,i){return i*200;})
		.attr({
			"cx" : function(d){ return x_scale(d.specialite)+35;},
			"cy" : function(d){ return y_scale(d.nbdemandes12p);},
			"r" : function(d) {  return r_scale(d.nbdemandes12p);}
		})
		.style("fill", function(d,i){return "rgb(73,190,183)"; });
	
	//labels
	svg.selectAll("text")
		.data(function(d) { return d3.range(d); })
		.data(data)
		.enter()
		.append("text")
		.text(function(d){ return d.nbdemandes1p})
		.attr({
			"x" : function(d){ return x_scale(d.specialite)+15;},		
			"y" : function(d){ return y_scale(d.nbdemandes1p)+3;}
		})
		.style({
			"fill" : "white",
			"font-size" : "11px",			
		});
		
	
	svg.selectAll("text")
		.data(function(d) { return d3.range(d); })
		.data(data)
		.enter()
		.append("text")
		.text(function(d){ return d.nbdemandes12p})
		.attr({
			"x" : function(d){ return x_scale(d.specialite)+30;},		
			"y" : function(d){ return y_scale(d.nbdemandes12p)+3;}
		})
		.style({
			"fill" : "white",
			"font-size" : "10px",			
		});
	
});
