function CreateSlider(bankChart, data) {
  var ticks = 6;
  var formatDate = d3.timeFormat("%Y");
  var containerClass = 'slider-container';
  var firstLevelContainer = d3.select("." + containerClass);
  var sliderContainer = firstLevelContainer.append("div").attr("class", containerClass + " graph-slider-container");
  var sliderStartLegend = sliderContainer.append("div").attr("class", containerClass + " graph-slider-legend graph-slider-legend-left");
  var sliderEndLegend = sliderContainer.append("div").attr("class", containerClass + " graph-slider-legend graph-slider-legend-right");
  var containerWidth = $("." + containerClass + ".graph-slider-container").width();
  var containerHeight = $("." + containerClass + ".graph-slider-container").height();
  data.sort(function (a, b) { return b.date < a.date ? 1 : -1 })
  var endDate = new Date(data[data.length - 1].date);
  var endYear = endDate.getFullYear();
  var startDate = new Date(data[0].date);
  var startYear = startDate.getFullYear();

  timeScale = d3.scaleTime().domain([startDate, endDate]).range([0, containerWidth]).nice();
  // var tickValues = new Array();
  // const division = Math.floor((endYear - startYear) / ticks);
  // for (var i = 0; i < ticks; i++) {
  //   tickValues.push(new Date(i * division + startYear + ''));
  // }
  // tickValues.push(new Date(endYear + ''));

  var svg = sliderContainer.append("svg").attr("class", containerClass + " graph-slider-svg");

  //add axis
  var g = svg.append("g")
    .attr("class", containerClass + " graph-slider-xaxis")
    .call(d3.axisBottom(timeScale)
      .tickFormat(function (d) { return formatDate(d); })
      // .tickValues(tickValues)
      .tickSize(containerHeight * 0.09)
      .ticks(5)
      
    );

  var brush = d3.brushX()
    .extent([[0, 0], [containerWidth, containerHeight * 0.31]])
    .on("start brush end", brushended)
  .on('end', rectDragEnd)

  var brushBox = svg.append("g")
    .attr("class", "brush")
    .attr("transform", "translate(" + 0 + "," + (containerHeight - g.node().getBoundingClientRect().height - containerHeight * 0.31) + ")");

  brushBox.call(brush);

  var handle = brushBox.selectAll('g').attr('class', 'handle--custom').data([{ type: "w" }, { type: "e" }])
    .enter().append("g")
    .attr("cursor", "ew-resize")
    .attr('fill', '#6cb8cb');
  handle.append("line")
    .attr("stroke", "#6cb8cb")
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', containerHeight * 0.31);
  handle.append("circle")
    .attr("class", "handle--custom")
    .attr("stroke", "#6cb8cb")
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 2)
  function brushended() {
    const selection = d3.event.selection;
    var d0 = selection.map(timeScale.invert)
    handle.attr("transform", function (d, i) { return "translate(" + [selection[i], 0] + ")"; })
    sliderStartLegend.html(formatDate(d0[0]))
    sliderStartLegend.style("left", selection[0] + 'px')
    sliderEndLegend.html(formatDate(d0[1]))
    sliderEndLegend.style("left", selection[1] + 'px')
    bankChart.startDate = d0[0];
    bankChart.endDate = d0[1];

    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!selection) return; // Ignore empty selections.
  }
  brushBox.call(brush.move, [0, containerWidth])
  brushBox.selectAll('.selection').attr('fill', '#6cb8cb').attr('stroke-width', 0)
  //addjust axis line & text
  g.selectAll("line").attr("y1", -containerHeight * 0.09);
  g.selectAll("text").attr("y", containerHeight * 0.09 * 2);
  var text = g.selectAll("text");
  text.each(function (d, i) {
    if (i === 0) {
      d3.select(this).attr("text-anchor", "start");
    }
    if (i === ticks - 1) {
      d3.select(this).attr("text-anchor", "end");
    }

  });

  g.attr("transform", "translate(" + 0 + "," + (containerHeight - g.node().getBoundingClientRect().height) + ")");
}