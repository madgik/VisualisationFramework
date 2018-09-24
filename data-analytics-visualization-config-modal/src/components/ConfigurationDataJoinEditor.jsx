import React from 'react'

import { Header, Divider, Form, Dropdown } from 'semantic-ui-react'

class ConfigurationDataJoinEditor extends React.Component {

  handleJoinFieldChange = (source, field) => {
    this.props.onJoinFieldChange(source, field);
  }

  extractFieldSuggestions = (index) => {
    var dataSource = this.props.dataSources[index];
    return (dataSource.fields || []).map(x => {
      return {
        text: x,
        value: x
      }
    });
  }

  getJoinField = (source) => {
    var joins = (this.props.joins || []);
    for (var i = 0; i < joins.length; i++) {
      var join = joins[i];
      if (join.source === source)
        return join.field;
    }
    return '';
  }

  render() {
    var show = (this.props.dataSources || []).length > 1;
    
    return show ? (<div>
      <Header>Join fields</Header>
      <Form.Group>
        {this.props.dataSources.map((item, index) => {
          return <Form.Field key={index} width={6}>
            <label>{item.name}</label>
            <Dropdown
              placeholder='Field'
              selection
              options={this.extractFieldSuggestions(index)}
              value={this.getJoinField(item.source)}
              onChange={(e, { value }) => this.handleJoinFieldChange(item.source, value)} />
          </Form.Field>;
        })}
      </Form.Group>
      <Divider />
    </div>) : '';
  }
}

export default ConfigurationDataJoinEditor;