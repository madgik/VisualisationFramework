import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DataImportForm from "../forms/DataImportForm";
import SelectGraphForm from "../forms/SelectGraphForm";
import ShowTopNodes from '../controls/ShowTopNodes';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 410,
  },
});

class GraphSelection extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    if (value == 1) {
      this.props.setGraphSource('history');
    }
    else {
      this.props.setGraphSource('new');
    }
  };

  handleChangeIndex = index => {
    // this.setState({ value: index });

  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.graphSource === 'new' ? 0 : 1}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Select From History" />
            <Tab label="Import New" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={(this.props.graphSource === 'new') ? 0 : 1}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <div className="config-controls">

              <SelectGraphForm
                getAllGraphsMetadata={this.props.getAllGraphsMetadata}
                setSelectedGraph={this.props.setSelectedGraph}
                selectedGraph={this.props.selectedGraph}
                allGraphsMetadata={this.props.allGraphsMetadata}

              />
              <ShowTopNodes
                getTopNodes={this.props.getTopNodes}
                selectedGraph={this.props.selectedGraph}
                getAllTimestamps={this.props.getAllTimestamps}

              />
              </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <div className="config-controls">
              <DataImportForm
                uploadFile={this.props.uploadFile}
                setFileValidation={this.props.setFileValidation}
                fileDetails={this.props.fileDetails}
              />
            </div>

          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

GraphSelection.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(GraphSelection);