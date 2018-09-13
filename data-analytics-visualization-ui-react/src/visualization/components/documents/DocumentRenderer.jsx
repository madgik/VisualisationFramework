import React from 'react';

import { Image, Loader } from 'semantic-ui-react'
import NoImageIcon from './NoImageIcon';

class DocumentRenderer extends React.Component {
  render() {
    if (!this.props.hasDocuments) return '';

    var imageStyle = {
      margin: '0px auto',
      display: 'block'
    }

    if (this.props.loading)
      imageStyle.opacity = 0.1;

    var positionRelative = {
      position: 'relative'
    }
    
    return (
      <div style={positionRelative}>
        <Loader active={this.props.loading}>Loading</Loader>
        {this.props.open ?
          <Image size='small' src={this.props.src} style={imageStyle} /> :
          <NoImageIcon size='small' style={imageStyle} />}
      </div>
    );
  }
}

export default DocumentRenderer;
