import React from 'react';
import Force from '../../utilities/Force';
import ReactDOM from 'react-dom';
import * as d3 from 'd3'



class Link extends React.Component {

    componentDidMount() {
        this.d3Link = d3.select(ReactDOM.findDOMNode(this))
            .datum(this.props.data)
            .call(Force.enterLink);
    }

    componentDidUpdate() {
        this.d3Link.datum(this.props.data)
            .call(Force.updateLink);
    }

    render() {
        return (<line className='link' />
        );
    }
}

export default Link;