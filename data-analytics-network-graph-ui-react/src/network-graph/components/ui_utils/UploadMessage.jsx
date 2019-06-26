import React from 'react'

import { Message, Image } from 'semantic-ui-react'

class UploadMessage extends React.Component {

  typeToMessage = {
    Graph: 'Please upload a valid json file'
  }

  render() {
    return <Message warning visible>
      <Message.Header>{this.typeToMessage[this.props.type]}</Message.Header>
   
    </Message>;
  }
}

export default UploadMessage;