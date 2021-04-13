// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");
var tip = d3
  .tip()
  .attr("class", "d3-tip")
  .html(function (EVENT, d) {
    console.log(d);
    return JSON.stringify(_.mapValues(d, "open"));
    // return JSON.stringify(+d["MN_PROBABLE_CASE_COUNT"]);
  });
// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3
  .line()
  .x(function (d) {
    return x(d.date);
  })
  .y(function (d) {
    return y(d.close);
  });

// define the 2nd line
var valueline2 = d3
  .line()
  .x(function (d) {
    return x(d.date);
  })
  .y(function (d) {
    return y(d.open);
  });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .call(tip);

// Get the data
d3.csv("../data/cases-by-day.csv").then(function (data) {
  // format the data
  data.forEach(function (d) {
    d.date = new Date(d["date_of_interest"]);
    d.close = +d["CASE_COUNT"];
    d.open = +d["CASE_COUNT_7DAY_AVG"];
  });
  console.log(data);

  // Scale the range of the data
  x.domain(
    d3.extent(data, function (d) {
      return d.date;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return Math.max(d.close, d.open);
    }),
  ]);

  // Add the valueline path.
  svg.append("path").data([data]).attr("class", "line").attr("d", valueline);

  // Add the valueline2 path.
  svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", valueline2)
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  // Add the X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g").call(d3.axisLeft(y));
});
