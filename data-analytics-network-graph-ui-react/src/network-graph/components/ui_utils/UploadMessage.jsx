import React from 'react'

import { Message, Image } from 'semantic-ui-react'

class UploadMessage extends React.Component {

  typeToMessage = {
    Graph: 'Please upload a valid json file of the following form'
  }

  render() {
    return <Message warning visible>
      <Message.Header>{this.typeToMessage[this.props.type]}</Message.Header>
      <p>
      </p>
    </Message>;
  }
}

export default UploadMessage;