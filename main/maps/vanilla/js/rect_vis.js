(async () => {

    ////////////////////////////////////
    ///////////// tooltip //////////////
    ////////////////////////////////////

    // Define the div for the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    ////////////////////////////////////
    ///////////// SVG Setup ////////////
    ////////////////////////////////////

    // margins for SVG
    const margin = {
        left: 100,
        right: 100,
        top: 100,
        bottom: 100
    }

    const svgWidth = 1200
    const svgHeight = svgWidth * 0.5

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    // add SVG
    const svg = d3.select('#vis-container')
        .append('svg')
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`) // responsive width & height
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    ////////////////////////////////////
    //////////// Dropdown //////////////
    ////////////////////////////////////
    let species = ["setosa", "versicolor", "virginica"]

    d3.select("#dropdown")
        .selectAll('options')
        .data(species)
        .join('option')
        .text(d => d)
        .attr("value", d => d)

    d3.select("#dropdown").on("change", function (event, d) {
        var selectedOption = d3.select(this).property("value")
        update(selectedOption)
    })

    ////////////////////////////////////
    ///////// Data Wrangling ///////////
    ////////////////////////////////////

    let data = await d3.csv('./data/iris.csv')

    let wrangled = []

    data.forEach(d => {
        wrangled.push({Species: d.Species, measure: d.Sepal_Length, measure_name:'Sepal_Length'})
        wrangled.push({Species: d.Species, measure: d.Sepal_Width, measure_name:'Sepal_Width'})
        wrangled.push({Species: d.Species, measure: d.Petal_Length, measure_name:'Petal_Length'})
        wrangled.push({Species: d.Species, measure: d.Petal_Width, measure_name:'Petal_Width'})
    })

    console.log(wrangled)

    ////////////////////////////////////
    /////////////// Scales /////////////
    ////////////////////////////////////

    let yScale = d3.scaleLinear()
        .domain([0, 8])
        .range([height, 0])

    let xScale = d3.scaleBand()
        .domain(['Sepal_Length', 'Sepal_Width', 'Petal_Length', 'Petal_Width'])
        .range([0,width])

    let colorScale = d3.scaleOrdinal()
        .domain(['Sepal_Length', 'Sepal_Width', 'Petal_Length', 'Petal_Width'])
        .range(d3.schemeSet3)

    ////////////////////////////////////
    ////////////// Axis ////////////////
    ////////////////////////////////////

    let xAxis = d3.axisBottom(xScale)

    let yAxis = d3.axisLeft(yScale)

    svg.append('g').call(yAxis)

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    ////////////////////////////////////
    /////// global Variables ///////////
    ////////////////////////////////////

    let selection = 'setosa'

    ////////////////////////////////////
    ///////////// Add Items ////////////
    ////////////////////////////////////

    let rect = svg.selectAll('rect')
        .data(wrangled.filter(d => d.Species == selection))
        .join('rect')
        .attr('fill', d => colorScale(d.measure_name))
        .attr('y', d => yScale(d.measure))
        .attr('x', d => xScale(d.measure_name))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.measure))
        .on("mouseover", function (event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`${d.measure_name} : ${d.measure}`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })

    ////////////////////////////////////
    ///////////// Update ///////////////
    ////////////////////////////////////

    function update(step) {

        rect
            .data(wrangled.filter(d => d.Species == step))
            .transition()
            .duration(5000)
            .attr('height', d => height - yScale(d.measure))
            .attr('y', d => yScale(d.measure))

    }

})()
