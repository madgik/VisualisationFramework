import React from 'react';

import * as d3 from 'd3';

class GraphRenderer extends React.Component {

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh() {
    var graph = this.props.visualization.graph;

    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    svg.selectAll("*").remove();

    if (graph.links.length === 0 || graph.nodes.length === 0) return;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function (d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "graph-node-line")
      .attr("stroke-width", function (d) {
        return Math.sqrt(d.value);
      });

    var node = svg.append("g")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g")

    node.append("circle")
      .attr("class", "graph-node-circle")
      .attr("r", 5)
      .attr("fill", function (d) {
        return color(d.group);
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node
      .append("text")
      .attr("class", "graph-node-text")
      .text(function (d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

    node.append("title")
      .text(function (d) {
        return d.id;
      });

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    function ticked() {
      link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });
      node
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return (
      <div className="graph-renderer">
        <svg width={this.props.size.width} height={this.props.size.height}></svg>
      </div>
    );
  }
}

GraphRenderer.defaultProps = {
  visualization: {
    
  }
};

export default GraphRenderer;
