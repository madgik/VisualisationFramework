import React from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers'
import ConfigurationModalInner from './ConfigurationModalInner';
import Ajax from '../utilities/Ajax';
import ErrorHandler from '../utilities/ErrorHandler';

import { configItemActions } from '../actions'

import './ConfigurationModal.css'

class ConfigurationModal extends React.Component {

  constructor(props) {
    super(props);
    this.isNew = false;
    this.editItemId = '';
    this.store = createStore(rootReducer,
      applyMiddleware(thunkMiddleware, createLogger({
        predicate: () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      }))
    );
  }
  
  extractGeoanalyticsLayers() {
      this.store.dispatch(configItemActions.updateGeoanalyticsLayers());
  }
  
  componentWillMount() {
    Ajax.setBaseUrl(this.props.routing.baseUrl);
    Ajax.setIsLocalDeployment(this.props.isLocalDeployment);
    ErrorHandler.init(this.store);
    this.store.dispatch(configItemActions.getAllConfigurations());
  }

  componentDidMount() {
    this.checkRefresh();
  }

  componentDidUpdate() {
    this.checkRefresh();
  }


  checkRefresh() {
    if (this.props.isNew !== this.isNew ||
      this.props.editItemId !== this.editItemId) {
      this.isNew = this.props.isNew;
      this.editItemId = this.props.editItemId;
      this.store.dispatch(configItemActions.getAllConfigurations());
      if (this.isNew || !this.editItemId || this.editItemId.length === 0) {
        this.store.dispatch(configItemActions.createConfiguration());
      } else {
        this.store.dispatch(configItemActions.editConfiguration(this.editItemId, this.props.onConfigurationLoaded));
      }
    }
  }

  render() {
    console.log("modal");
    return (
      <Provider store={this.store}>
        <ConfigurationModalInner
          allowDelete={this.props.allowDelete}
          open={this.props.open}
          isNew = {this.props.isNew}
          onModalClose={this.props.onModalClose}
          onDeleteComplete={this.props.onDeleteComplete}
          onSaveComplete={this.props.onSaveComplete}
        />
      </Provider>
    )
  }
}

export default ConfigurationModal