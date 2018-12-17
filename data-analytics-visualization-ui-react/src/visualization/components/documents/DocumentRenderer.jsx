import React from 'react';

import { Image, Loader, Grid } from 'semantic-ui-react'
import NoImageIcon from './NoImageIcon';
import idGenerator from 'react-id-generator';

class DocumentRenderer extends React.Component {

  renderImage(imageUrl, imageStyle) {
    return (
      <Grid.Column textAlign={"center"} key={idGenerator()}>
        <Image size='small' src={imageUrl} style={imageStyle}  />
      </Grid.Column>
    );
  }

  render() {
    if (!this.props.hasDocuments) return '';

    var imageStyle = {
      margin: '2px auto',
      display: 'inline'
    }

    if (this.props.loading)
      imageStyle.opacity = 0.1;
    
    return (
      <div >
        <Loader active={this.props.loading}>Loading</Loader>
        <Grid columns={5}  centered={true} > 
            {this.props.open ?
              this.props.src.map(imageUrl => this.renderImage(imageUrl.url, imageStyle)) :
              <Grid.Column textAlign={"center"}>
                <NoImageIcon size='small' style={imageStyle} />       
              </Grid.Column>
            }
        </Grid>
      </div>
    );
  }
}

export default DocumentRenderer;
