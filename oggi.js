let width = window.innerWidth
let height = window.innerHeight
let margin = 30

let svg = d3.selectAll("body")
.append("svg")
.attr("width", width - margin)
.attr("height", height - margin)
.style("background", "#fbfbfb")
.style("border", "1px solid #919191")

//scales
let x = d3.scaleLinear()
.range([0, width])

let y = d3.scaleLinear()
.range([height, 0])

let size = d3.scaleSqrt()
.range([0,30])

d3.csv("honeyproduction.csv", function(error, data) {
	if (error) throw error

	x.domain(d3.extent(data, d => { 
		return +d.priceperlb
	}))

	y.domain(d3.extent(data, d => { 
		return +d.totalprod
	}))

	size.domain(d3.extent(data, d => {
		return +d.numcol
	}))

	svg.selectAll("svg")
	.data(data)
	.enter()
	.append("rect")
	.attr("width", d => { return size(d.numcol)})
	.attr("height", d => { return size(d.numcol)})
	.attr("x", d => { return x(d.priceperlb)})
	.attr("y", d => { return y(d.totalprod)})
	.style("opacity", 0.5)
	.style("fill", "#f6d365")

	//console.log(JSON.stringify(data, null, "\t"));

})