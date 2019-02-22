import React from 'react';

import * as d3 from 'd3';

class TreeRenderer extends React.Component {

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  refresh() {
    var treeData = this.props.visualization.tree;

    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    svg.selectAll("*").remove();

    function zoomed() {
      g.attr("transform", d3.event.transform);
    }

    svg.call(d3.zoom().on("zoom", zoomed));

    var g = svg.append("g").attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")");

    var tree = d3.tree()
      .size([2 * Math.PI, 500])
      .separation(function (a, b) { return (a.parent === b.parent ? 1 : 2) / a.depth; });

    function radialPoint(x, y) {
      return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
    }

    if (treeData == null) return;

    var root = d3.hierarchy(treeData);
    tree(root);

    g.selectAll(".link")
      .data(root.links())
      .enter().append("path")
      .attr("class", "tree-renderer-link")
      .attr("d", d3.linkRadial()
        .angle(function (d) { return d.x; })
        .radius(function (d) { return d.y; }));

    var node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function (d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });

    node.append("circle")
      .attr("r", 2.5);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", function (d) { return ((d.x < Math.PI) === !d.children) ? 6 : -6; })
      .attr("text-anchor", function (d) { return ((d.x < Math.PI) === !d.children) ? "start" : "end"; })
      .attr("transform", function (d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
      .text(function (d) { return d.data.name; });
  }

  render() {
    return (
      <div className="tree-renderer">
        <svg width={this.props.size.width} height={this.props.size.height}></svg>
      </div>
    );
  }
}

TreeRenderer.defaultProps = {
  visualization: {

  }
};

export default TreeRenderer;
