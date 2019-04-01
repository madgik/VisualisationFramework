import React from 'react';

import { Image, Loader, Grid } from 'semantic-ui-react'
import NoImageIcon from './NoImageIcon';
import idGenerator from 'react-id-generator';
import { Button, Icon } from 'semantic-ui-react'

class DocumentRenderer extends React.Component {

  renderImage(imageUrl, imageStyle) {
    return (
      <Grid.Column  textAlign={"center"} key={idGenerator()}>
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

    var positionRelative = {
        position: 'relative'

      }
      
    return (
      <div style={positionRelative} >
        <Loader active={this.props.loading}>Loading</Loader>
        <Grid  columns='equal' > 
          <Grid.Row>
              {this.props.open ?
                this.props.src.map(imageUrl => this.renderImage(imageUrl.url, imageStyle)) :
                <Grid.Column textAlign={"center"}>
                  <NoImageIcon size='small' style={imageStyle} />       
                </Grid.Column>
              }
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign={"center"}>
              <Button className="chart-printer" icon onClick={this.props.onChartCanvasClick}>
                <Icon name='undo' />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
    );
  }
}

export default DocumentRenderer;
