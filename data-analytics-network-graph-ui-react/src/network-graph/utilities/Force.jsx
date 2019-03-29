import React from 'react';
import ReactDOM from 'react-dom';

// import * as d3 from 'd3';

class Force {

  // width = 1180
  // height = 900
  // color = d3.scaleOrdinal(d3.schemeCategory10);

  // initForce = (nodes, links) => {
  //   this.force = d3.forceSimulation(nodes)
  //     .force("charge", d3.forceManyBody().strength(-200))
  //     .force("link", d3.forceLink(links).distance(70))
  //     .force("center", d3.forceCenter().x(this.width / 2).y(this.height / 2))
  //     .force("collide", d3.forceCollide([5]).iterations([5]));
  // }

  // enterNode = (selection) => {
  //   var circle = selection.select('circle')
  //     .attr("r", 25)
  //     .style("fill", function (d) {
  //         if (d.id > 3) {
  //             return 'darkcyan'
  //         } else { return 'tomato' }})
  //     .style("stroke", "bisque")
  //     .style("stroke-width", "3px")

  //   selection.select('text')
  //     .style("fill", "honeydew")
  //     .style("font-weight", "600")
  //     .style("text-transform", "uppercase")
  //     .style("text-anchor", "middle")
  //     .style("alignment-baseline", "middle")
  //     .style("font-size", "10px")
  //     .style("font-family", "cursive")
  // }

  // updateNode = (selection) => {
  //   selection
  //     .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
  //     .attr("cx", function(d) {
  //       return d.x = Math.max(30, Math.min(this.width - 30, d.x));
  //     })
  //     .attr("cy", function(d) {
  //       return d.y = Math.max(30, Math.min(this.height - 30, d.y));
  //     })
  // }

  // enterLink = (selection) => {
  //   selection
  //     .attr("stroke-width", 3)
  //     .attr("stroke", "bisque")
  // }

  // updateLink = (selection) => {
  //   selection
  //     .attr("x1", (d) => d.source.x)
  //     .attr("y1", (d) => d.source.y)
  //     .attr("x2", (d) => d.target.x)
  //     .attr("y2", (d) => d.target.y);
  // }

  // updateGraph = (selection) => {
  //   selection.selectAll('.node')
  //     .call(this.updateNode)
  //   selection.selectAll('.link')
  //     .call(this.updateLink);
  // }

  // dragStarted = (d) => {
  //   if (!d3.event.active) this.force.alphaTarget(0.3).restart();
  //   d.fx = d.x;
  //   d.fy = d.y
  // }

  // dragging = (d) => {
  //   d.fx = d3.event.x;
  //   d.fy = d3.event.y
  // }

  // dragEnded = (d) => {
  //   if (!d3.event.active) this.force.alphaTarget(0);
  //   d.fx = null;
  //   d.fy = null
  // }

  // drag = () => d3.selectAll('g.node')
  // .call(d3.drag()
  //   .on("start", this.dragStarted)
  //   .on("drag", this.dragging)
  //   .on("end", this.dragEnded)
  // )

  // tick = (that) => {
  //   that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
  //   this.force.on('tick', () => {
  //     that.d3Graph.call(this.updateGraph)
  //   });
  // };

}

export default new Force();