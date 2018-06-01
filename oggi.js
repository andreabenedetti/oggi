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

	x.domain(d3.extent(data, d => +d.priceperlb))

	y.domain(d3.extent(data, d => +d.totalprod))

	size.domain(d3.extent(data, d => +d.numcol))

	color.domain(d3.extent(data, d => +d.year))

let enter = svg.selectAll("svg")
	.data(data)
	.enter()

enter.append("text")
	.attr("x", d => x(d.priceperlb))
	.attr("y", d => y(d.totalprod) - 2)
	.text(d => d.state)
	.classed("label", true)

enter.append("text")
	.attr("x", d => x(d.priceperlb))
	.attr("y", d => y(d.totalprod) - 12)
	.text(d => d.year)
	.classed("year", true)
	.style("fill", d => color(d.year))

enter.append("rect")
	.attr("width", d => size(d.numcol))
	.attr("height", d => size(d.numcol))
	.attr("x", d => x(d.priceperlb))
	.attr("y", d => y(d.totalprod))
	.attr("class", d => "stateRect_" + d.state)
	.style("opacity", 0.3)
	.style("fill", d => color(d.year))
    .on("mouseover", d => {
        d3.selectAll(".stateRect_" + d.state).style("opacity", 1)
        d3.selectAll(".stateLine_" + d.state).style("opacity", 0.4)
    })
    .on("mouseout", function() {
       d3.selectAll("rect")
       .style("opacity", 0.3)
       d3.selectAll("path").style("opacity", 0)
   })

    .on("click", d => {
    	d3.selectAll(".stateRect_" + d.state)
    	.style("opacity", 1)
    })

/*enter.append("line")
	.attr("x1", d => x(d.priceperlb))
	.attr("y1", d => { return y(d.totalprod)})
	.attr("x2", d => { return x(d.priceperlb) + 100})
	.attr("y2", d => { return y(d.totalprod) + 100})
	.attr("stroke", "#000000")
	.attr("stroke-width", 2)*/

let dataByState = d3.nest()
  .key( d=> d.state)
  .entries(data)

var lineGenerator = d3.line()
    .x( d=> x(d.priceperlb))
    .y( d=> y(d.totalprod))

console.log(dataByState)


dataByState.forEach( state => {
	let lineData = state.values

	svg.append("path")
	  .attr("d", lineGenerator(lineData))
	  .attr("stroke", "black")
	  .attr("stroke-width", 1)
	  .attr("fill", "none")
	  .attr("class", d => "stateLine_" + state.key)
	  .attr("opacity", 0)
	})
})

	/*prendere i data point
	grupparli per stato (d3.nest) -> ciclo per ogni stato, dentro ogni stato un altro ciclo per ogni anno
	ordinarli per data
	disegnare path per ogni g stato
	path ha dentro tutti i punti (ogni data)*/

	//console.log(JSON.stringify(data, null, "\t"));
