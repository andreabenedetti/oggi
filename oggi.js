let width = window.innerWidth,
	height = window.innerHeight,
	margin = 30;

let svg = d3.selectAll("body")
.append("svg")
.attr("width", width - margin)
.attr("height", height - margin)
.style("background", "snow");

// scales
let x = d3.scaleLog()
.range([0, width]);

let y = d3.scaleLog()
.range([height, 0]);

let size = d3.scaleLinear()
.range([3, 60]);

let colorScale = d3.scaleLinear(d3.interpolateWarm())
.range([0, 1]);

d3.csv("honeyproduction.csv", function(error, data) {
	if (error) throw error;

	x.domain(d3.extent(data, d => { 
		console.log(+d.stocks)
		return +d.stocks; }
	));

	y.domain(d3.extent(data, d => { 
		console.log(+d.prodvalue)
		return +d.prodvalue; }
	));

	size.domain(d3.extent(data, d => { 
		console.log(+d.numcol)
		return +d.numcol; }
	));

	svg.selectAll("svg")
	.data(data)
	.enter()
	.append("rect")
	.attr("fill", d => { return colorScale(d.priceperlb); console.log(colorScale(d.priceperlb))} )
	.attr("width", 1 )
	.attr("height", d => { return size(d.numcol) } )
	.attr("x", d => { return x(d.stocks)} ) 
	.attr("y", d => { return y(d.prodvalue)} ) 

	// console.log(JSON.stringify(data, null, "\t"));

})