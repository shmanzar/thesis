(async () => {

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

    d3.select("#dropdown")
        .selectAll('options')
        .data(['Sepal_Length', 'Sepal_Width', 'Petal_Length', 'Petal_Width'])
        .join('option')
        .text(d => d.replace(/_/g, ' '))
        .attr("value", d => d)

    d3.select("#dropdown").on("change", function (d) {
        var selectedOption = d3.select(this).property("value")
        console.log(selectedOption)
        update(selectedOption)
    })

    ////////////////////////////////////
    ///////// Data Wrangling ///////////
    ////////////////////////////////////

    let data = await d3.csv('./data/iris.csv')
    console.log(data)

    ////////////////////////////////////
    /////////////// Scales /////////////
    ////////////////////////////////////

    let xScale = d3.scaleLinear()
        .domain([0, 8])
        .range([0, width])

    let species = ["setosa", "versicolor", "virginica"]

    let yScale = d3.scalePoint()
        .domain(species)
        .range([height, 0])

    let colorScale = d3.scaleOrdinal()
        .domain(species)
        .range(['pink', 'blue', 'purple'])

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

    const radius = 5

    let measure = 'Sepal_Length'

    ////////////////////////////////////
    /////////// Force Layout ///////////
    ////////////////////////////////////

    function tick() {
        d3.selectAll('.circles')
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }

    var simulation = d3.forceSimulation(data)
        .force('y', d3.forceY(d => yScale(d.Species)).strength(0.5))
        .force('x', d3.forceX(d => xScale(d[measure])).strength(0.5))
        .force('collide', d3.forceCollide(radius)) // add spacing between circles
        .alphaDecay(0.01)
        .alpha(0.2)
        .on('tick', tick)

    // ////////////////////////////////////
    // ///////////// Add Items ////////////
    // ////////////////////////////////////

    svg.selectAll('.circles')
        .data(data)
        .join('circle')
        .attr('r', radius)
        .attr('fill', d => colorScale(d.Species))
        .attr('cy', d => yScale(d.Species))
        .attr('cx', d => xScale(d[measure]))
        .attr('class', 'circles')

    // // optional time out - stop the simulation after a number of seconds
    var init_decay;
    init_decay = setTimeout(function () {
        console.log('init alpha decay')
        simulation.alphaDecay(0.1);
    }, 8000);

    // ////////////////////////////////////
    // ///////////// Update ///////////////
    // ////////////////////////////////////

    function update(step) {

        simulation.force('x', d3.forceX(d => xScale(d[step])))
        simulation.force('y', d3.forceY(d => yScale(d.Species)))

        simulation
            .alphaDecay(0.01)
            .alpha(0.15)
            .restart()

        // optional time out - stop the simulation after a number of seconds
        clearTimeout(init_decay);
        init_decay = setTimeout(function () {
            console.log('init alpha decay');
            simulation.alphaDecay(0.1);
        }, 8000);

    }

})()
