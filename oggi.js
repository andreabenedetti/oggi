let width = window.innerWidth
let height = window.innerHeight
let margin = 30

let svg = d3.selectAll("body")
.append("svg")
.attr("width", width - margin)
.attr("height", height - margin)
.style("background", "#fbfbfb")
//.style("border", "1px solid #919191")

//scales
let x = d3.scaleLinear()
.range([20, width])

let y = d3.scaleLinear()
.range([height - 50, 30])

let size = d3.scaleSqrt()
.range([1,30])

let color = d3.scaleLinear()
.interpolate(d3.interpolateHcl)
.range([d3.rgb("#ff0000"), d3.rgb("#0000ff")])

let highlightedRect = d3.select(null)

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

	color.domain(d3.extent(data, d => {
		return +d.year
	}))

svg.selectAll("svg")
	.data(data)
	.enter()
	.append("rect")
	.attr("width", d => { return size(d.numcol)})
	.attr("height", d => { return size(d.numcol)})
	.attr("x", d => { return x(d.priceperlb)})
	.attr("y", d => { return y(d.totalprod)})
	.style("opacity", 0.3)
	.style("fill", d => { return color(d.year)})
    .on("mouseover", function() {
        d3.select(this).style("opacity", 1)
    })
    .on("mouseout", function() {
       d3.selectAll("rect").style("opacity", 0.3)})
    

svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.attr("x", d => { return x(d.priceperlb)})
	.attr("y", d => { return y(d.totalprod) - 2})
	.text(d => { return d.state})
	.classed("label", true)


svg.selectAll("svg")
	.data(data)
	.enter()
	.append("text")
	.attr("x", d => { return x(d.priceperlb)})
	.attr("y", d => { return y(d.totalprod) - 12})
	.text(d => { return d.year})
	.classed("year", true)
	.style("fill", d => { return color(d.year)})


	//console.log(JSON.stringify(data, null, "\t"));

})