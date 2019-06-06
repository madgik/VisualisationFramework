import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this)
  }
  closeModal() {
    this.props.setModalIsOpen(false);
  }

  typeToMessage = {
    uploadSuccess: ['', ''],

    uploadMessage: ['', ''],

    uploadStarted: ['File upload Successful', 'Data import process have been initialized']
  }

  render() {
    return (
      // <Modal
      //   isOpen={this.props.modalIsOpen}
      //   onAfterOpen={this.afterOpenModal}
      //   onRequestClose={this.closeModal}
      //   style={customStyles}
      //   contentLabel={this.typeToMessage[this.props.modalMessage][0]}
      //   ariaHideApp={false}
      // >

      //   <h2>{this.typeToMessage[this.props.modalMessage][0]}</h2>

      //   <div>{this.typeToMessage[this.props.modalMessage][1]}</div>
      //   <Button onClick={this.closeModal}>close</Button>
      // </Modal>

      <Dialog
        open={this.props.modalIsOpen}
        onClose={this.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.typeToMessage[this.props.modalMessage][0]}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {this.typeToMessage[this.props.modalMessage][1]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeModal} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ModalContainer;