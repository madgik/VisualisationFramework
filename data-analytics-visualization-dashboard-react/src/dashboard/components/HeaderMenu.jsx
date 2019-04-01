import React from 'react';


import {  Header, Input, Button } from 'semantic-ui-react'
import Modal from '@trendmicro/react-modal';
// Be sure to include styles at some point, probably during your bootstraping
// import '@trendmicro/react-modal/dist/react-modal.css';
import FileBrowser, {  Icons } from 'react-keyed-file-browser'
import Moment from 'moment'
import '../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';

function EmptyRenderer() { 
    
    return ( <div></div> ) }

class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.onSave = this.onSave.bind(this);

  }
  handleItemClick = (event) => {
    console.log(event);  
}



  handleClick() {
    this.props.clickButtonCallback(this.props.item);
  }

  onClick(){

  }

  openDashboardWorkspaceDirectory() {
    this.props.openDashboardWorkspaceDirectory();
  }

  onSave(e) {
    this.props.updateDashBoardTitle(e);
 //   visualizationActions.updateDashBoardTitle(e);
  }


  handleCreateFiles = (files, prefix) => {
    this.setState(state => {
      const newFiles = files.map((file) => {
        let newKey = prefix
        if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
          newKey += '/'
        }
        newKey += file.name
        return {
          key: newKey,
          size: file.size,
          modified: +Moment(),
        }
      })

      const uniqueNewFiles = []
      newFiles.map((newFile) => {
        let exists = false
        state.files.map((existingFile) => {
          if (existingFile.key === newFile.key) {
            exists = true
          }
        })
        if (!exists) {
          uniqueNewFiles.push(newFile)
        }
      })
      state.files = state.files.concat(uniqueNewFiles)
      return state
    })
  }
  
  handleDeleteFile = (fileKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key !== fileKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }



  render() {
    return (
        
    <div className='ui clearing segment'>

        <Header as='h1'>
        <div className="ui transparent input">
            <Input
                maxLength={750}
                placeholder="Dashboard Title"
                onChange={(e) => this.onSave(e.target.value)}
            />
            </div>
        </Header>
        <Button floated='right' onClick={this.openDashboardWorkspaceDirectory.bind(this)} >Save</Button>
        <Button floated='right'>Open</Button>

        <Modal center showOverlay={true}  onClose={this.onCloseModal} >
          <Modal.Header>
            <Modal.Title>
              Select date range
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FileBrowser

                files={[
                    {
                      key: 'cat.txt',
                      modified: +Moment().subtract(1, 'hours'),
                      size: 1.5 * 1024 * 1024,
                    },
                    {
                      key: 'kitten.png',
                      modified: +Moment().subtract(3, 'days'),
                      size: 545 * 1024,
                    },
                    {
                      key: 'elephant.png',
                      modified: +Moment().subtract(3, 'days'),
                      size: 52 * 1024,
                    },
                    {
                      key: 'dog.png',
                      modified: +Moment().subtract(1, 'hours'),
                      size: 1.5 * 1024 * 1024,
                    },
                    {
                      key: 'turtle.png',
                      modified: +Moment().subtract(3, 'months'),
                      size: 545 * 1024,
                    },
                    {
                      key: 'gecko.png',
                      modified: +Moment().subtract(2, 'days'),
                      size: 52 * 1024,
                    },
                    {
                      key: 'centipede.png',
                      modified: +Moment().subtract(0.5, 'hours'),
                      size: 1.5 * 1024 * 1024,
                    },
                    {
                      key: 'possum.png',
                      modified: +Moment().subtract(32, 'days'),
                      size: 545 * 1024,
                    },
                  ]}
                  icons={Icons.FontAwesome(4)}
                  canFilter= {false}

                  onCreateFolder={this.handleCreateFolder}
                  onSelectFile={this.handleItemClick}
                  onDeleteFolder={this.handleDeleteFolder}
                  onDeleteFile={this.handleDeleteFile}
                detailRenderer={EmptyRenderer}

                

            />   
          </Modal.Body>
        </Modal>

        
  </div>
    );
  }
}

export default HeaderMenu;