import React from 'react';

import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import Stop from '@material-ui/icons/Stop';
import IconButton from '@material-ui/core/IconButton';
import RecordRTC from 'recordrtc';
import GraphView from '../../components/graph/GraphView'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import html2canvas from 'html2canvas';

let fileSaver = require("file-saver");


const styles = theme => ({

  iconSmall: {
    fontSize: 20,
  },
});

let recorder;

class RecordControls extends React.Component {

  elementToRecord;
  context;
  canvas2d;
  isRecordingStarted = false;
  isStoppedRecording = false;
  url = null;
  blob = null;
  recorder = null;
  loopInit = null;

  constructor(props) {
    super(props);
    this.handleStartRecordClick = this.handleStartRecordClick.bind(this);
    this.handleStopRecordClick = this.handleStopRecordClick.bind(this);
    this.handleSaveFile = this.handleSaveFile.bind(this);

    this.urlRef = React.createRef;
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.webrtc-experiment.com/screenshot.js";
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "http://webrtc.github.io/adapter/adapter-latest.js";
    script2.async = true;
    document.body.appendChild(script);
  }

  componentWillMount() {

  }

  componentDidUpdate() {
    this.elementToRecord = this.props.graphRef().current;
    this.canvas2d = this.props.canvasRef().current;

    if (this.elementToRecord != null && this.canvas2d != null && this.canvas2d != undefined) {
      this.context = this.canvas2d.getContext('2d');
      this.canvas2d.width = this.elementToRecord.clientWidth;
      this.canvas2d.height = this.elementToRecord.clientHeight;
      if (this.loopInit == null) {
        this.loop();
      }
    }
  }

  loop() {
    this.loopInit = 1;
    let that = this;

    (function looper() {

      if (!that.isRecordingStarted) {
        return setTimeout(looper, 500);
      }

      // console.log("context=" + html2canvas);
      html2canvas(that.elementToRecord).then(function (canvas) {

        that.context.clearRect(0, 0, that.canvas2d.width, that.canvas2d.height);
        that.context.drawImage(canvas, 0, 0, that.canvas2d.width, that.canvas2d.height);
        if (that.isStoppedRecording) {
          return;
        }
        requestAnimationFrame(looper);
      });
    }());

  }

  handleStartRecordClick() {
    let that = this;

    this.isStoppedRecording = false;
    this.isRecordingStarted = true;

    this.props.setRecord(true);
    var recorder = RecordRTC(this.canvas2d, {
      type: 'canvas',
    });
    recorder.startRecording();

    (function looper() {
      if (that.isStoppedRecording) {
        recorder.stopRecording(function () {
          that.blob = recorder.getBlob();
        });
        return;
      }
      setTimeout(looper, 100);
    })();

  }

  handleStopRecordClick() {

    this.isRecordingStarted = false;
    this.isStoppedRecording = true;
    this.props.setRecord(false);
    this.props.setAvailRecord(true);
  }

  handleSaveFile() {
    var filename = this.props.filename.split('.').slice(0, -1).join('.') + '.mp4'

    var mp4 = new File([this.blob], filename, {
      type: 'video/mp4'
    });
    // console.log("size" + this.blob.size +filename);
    fileSaver.saveAs(mp4, filename);
  }

  render() {
    const { classes } = this.props;


    if ((this.props.graph.nodes === undefined || this.props.graph.nodes.length == 0)) {
      return ('');
    }
    else {
      return (
        <div className="recorder">
          <Grid
            container
            direction='row'
            spacing={8}
            alignItems='center'
          >
            <Grid item>
              <label>Record Graph</label>
            </Grid>
            <Grid item>
              {this.props.record == false ?
                <IconButton className='player-controls' aria-label="Record" color="primary"
                  onClick={this.handleStartRecordClick}
                >
                  <FiberManualRecord />
                </IconButton>
                :
                <IconButton className='player-controls' aria-label="Stop" color="primary"
                  onClick={this.handleStopRecordClick}
                >
                  <Stop />
                </IconButton>
              }
            </Grid>
            <Grid>
              <Button variant="contained" size="small" className={classes.button} onClick={this.handleSaveFile} disabled={!this.props.availRecord}>
                <a ref={this.urlRef}></a>
                <SaveIcon className={classes.iconSmall} />
                Save
            </Button>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

}

RecordControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecordControls)
