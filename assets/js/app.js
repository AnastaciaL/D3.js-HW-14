// @TODO: YOUR CODE HERE!
// D3 Scatter Plot

//Set up a width, a height and margins of the graph

var svgWidth = 950;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create a canvas for the graph
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgwidth)
  .attr("height", svgheight)
  .attr("class", "chart");

// Set a radius for an each dot of the graph
var circRadius;
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();

// Set up labels for the axes

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var file = "assets/data/data.csv"
d3.csv(file).then(function(data){
    console.log(data);
    data.forEach(d => {
        d.poverty = +d.poverty;
        d.age = +d.age;
        d.income = +d.income;
        d.noHealthInsurance = +d.healthcare;
        d.obesity = +d.obesity;
        d.smokes = +d.smokes;
    });

    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(data, d => d.poverty)])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.noHealthInsurance)])
    .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.noHealthInsurance))
    .attr("r", "15")
    .attr("fill", "lightBlue")
    .attr("opacity", ".75")
    .attr("stroke", "orange")
  
    // Set up tooltip rules
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
        return (`${d.state}<br>% in poverty: ${d.poverty}%<br>% without insurance: ${d.noHealthInsurance}`);
        });

    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    })

    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

     
    chartGroup.selectAll(".dodo")
    .data(data)
    .enter().append("text")
    .attr("class", "dodo")
    .attr("x", function(d) { return xLinearScale(d.poverty); })
    .attr("y", function(d) { return yLinearScale(d.noHealthInsurance); })
    .text(function(d) { return d.abbr;})
    .attr("dy", ".5em")
    .attr("dx", "-.5em")
    .attr("fill", "Grey")
    .attr("text-anchor", "center")
    .attr("font-size", 8)
    ;

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2) - 40)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("% without insurance");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("% below poverty line");

})
