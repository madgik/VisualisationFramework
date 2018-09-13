import React from 'react'

class ConfigurationErrorPanel extends React.Component {
  render() {
    return (<div className="ui error message">
      <ul className="list">
        {this.props.validation.map((error, index) =>
          <li key={index}>{error}</li>
        )}
      </ul>
    </div>);
  }
}

export default ConfigurationErrorPanel;