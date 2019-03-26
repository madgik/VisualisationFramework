import React from 'react';

import './graph.css';

import Force from '../../utilities/Force';

import Link from './Link';
import Node from './Node';
// import * as d3 from 'd3';

class GraphView extends React.Component {

  componentDidMount() {
    Force.initForce(this.props.nodes, this.props.links)
    Force.tick(this)
    Force.drag()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nodes !== this.props.nodes || prevState.links !== this.props.links) {
      Force.initForce(this.props.nodes, this.props.links)
      Force.tick(this)
      Force.drag()
    }
  }

  handleAddNode(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addNode(e) {
    e.preventDefault();
    this.setState(prevState => ({
      nodes: [...prevState.nodes, {
        name: this.props.name,
        id: prevState.nodes.length + 1,
        x: Force.width / 2,
        y: Force.height / 2
      }],
      name: ''
    }));
  }

  mapLinks() {
    this.props.links = this.props.links.map((link) => {
      return ( <Link key={link.id}
      data={link}
    />);
   });
  }
  
  mapNodes() {
    this.props.nodes = this.props.nodes.map((node) => {
      return ( <Node data={node}
      name={node.name}
      key={node.id} />);
      });
  }
   

  render() {
    return (
      <div className="main-content">
        <h1>NetworkGraph</h1>
        <div className='chartContainer'>
          <div className="graph__container">
            <svg className="graph"
              width={Force.width}
              height={Force.height} >
              <g> {this.props.links} </g>
              <g> {this.props.nodes} </g>
            </svg>
          </div>
          </div>
      </div>
    );
  }
}

export default GraphView;
