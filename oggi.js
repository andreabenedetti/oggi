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

let colorScale = d3.scaleLinear()
.interpolate(d3.interpolateRgb)
.range([d3.rgb("#E8E4E4"), d3.rgb('#FF0000')]);

let xAxis = d3.axisBottom(x)
.tickSize(height - margin * 1.5)
.tickFormat(d3.format(".0s"));

let yAxis = d3.axisLeft(y)
.tickSize(width - margin * 1.5)
.tickFormat(d3.format(".0s"));

d3.csv("honeyproduction.csv", function(error, data) {
	if (error) throw error;

	x.domain(d3.extent(data, d => { 
		return +d.stocks; }
	));

	y.domain(d3.extent(data, d => { 
		return +d.prodvalue; }
	));

	size.domain(d3.extent(data, d => { 
		return +d.numcol; }
	));

	colorScale.domain(d3.extent(data, d => { 
		return +d.year; }
	));

	svg.append("g")
    .call(xAxis)
    .classed("axis", true);

    svg.append("g")
    .call(yAxis)
    .attr("transform","translate(" + ( width - margin ) + ",0)")
    .classed("axis", true);

	svg.selectAll("svg")
	.data(data)
	.enter()
	.append("rect")
	.attr("fill", d => { return colorScale(d.year); } )
	.attr("width", 1.5 )
	.attr("height", d => { return size(d.numcol) } )
	.attr("x", d => { return x(d.stocks)} ) 
	.attr("y", d => { return y(d.prodvalue)} )

	svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.attr("x", d => { return x(d.stocks)} ) 
	.attr("y", d => { return y(d.prodvalue) - 2} ) 
	.attr("fill", d => { return colorScale(d.year); } )
	.text(d => { return d.state } )
	.classed("label", true)

	// console.log(JSON.stringify(data, null, "\t"));

})