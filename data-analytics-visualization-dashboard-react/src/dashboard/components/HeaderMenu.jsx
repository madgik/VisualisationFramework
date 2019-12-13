import React from 'react';


import {  Header, Input, Button } from 'semantic-ui-react'
import Modal from '@trendmicro/react-modal';
// Be sure to include styles at some point, probably during your bootstraping
// import '@trendmicro/react-modal/dist/react-modal.css';
import FileBrowser, {  Icons } from 'react-keyed-file-browser'
import '../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';

function EmptyRenderer() { 
    
    return ( <div></div> ) }

class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  handleItemClick = (event) => {
    console.log(event);  
    this.props.openFileFromWorkspace(event);  
}

  handleFieldChange = (value) => {
    this.props.onFieldChange(value);
  }

  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  onClick(){

  }

  onSaveCloseModal(){
    this.props.saveDashboardWorkspaceDirectory(false);

  }

  saveDashboardWorkspaceDirectory() {
    this.props.saveDashboardWorkspaceDirectory(true);
  }

  onCloseModal(){
    this.props.openDashboardWorkspaceDirectory(false);

  }

  openDashboardWorkspaceDirectory() {
    this.props.openDashboardWorkspaceDirectory(true);
  }

  onSave(e) {
    this.props.updateDashBoardTitle(e);
 //   visualizationActions.updateDashBoardTitle(e);
  }

  onFileSaveToWorkspace(){
    this.props.onFileSaveToWorkspace();
  }

  render() {
    return (
        
    <div className='ui clearing segment'>

        <Header as='h1'>
        <div className="ui transparent input">
            <Input style={{width: "570px"}}
                maxLength={1750}
                placeholder="Dashboard Title"
                value={this.props.visualization.dashboardTitle}
                onChange={(e) => this.onSave(e.target.value)}
            />
            </div>
        </Header>
        <Button floated='right' onClick={this.saveDashboardWorkspaceDirectory.bind(this)} >Save</Button>
        <Button floated='right' onClick={this.openDashboardWorkspaceDirectory.bind(this)} >Open</Button>

        <Modal center showOverlay={true} show={this.props.workspace.showOpenFromWorkspace} onClose={this.onCloseModal.bind(this)} >
          <Modal.Header>
            <Modal.Title>
              Dashboard Visualization Folder
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FileBrowser

                files= {this.props.workspace.workspaceFiles}
                  icons={Icons.FontAwesome(4)}
                  canFilter= {false}

                  onSelectFile={this.handleItemClick}
                
                detailRenderer={EmptyRenderer}

                

            />   
          </Modal.Body>
        </Modal>

        <Modal center showOverlay={true} show={this.props.workspace.showSaveToWorkspace} onClose={this.onSaveCloseModal.bind(this)} >
          <Modal.Header>
            <Modal.Title>
              Save to Dashboard Visualization Folder
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input placeholder='filename' value={ this.props.workspace.filename} onChange={(e) => this.handleFieldChange(e.target.value)} /> .json
            <Button floated='right' onClick={this.onFileSaveToWorkspace.bind(this)} >Save</Button>
          </Modal.Body>
        </Modal>
  </div>
    );
  }
}

export default HeaderMenu;