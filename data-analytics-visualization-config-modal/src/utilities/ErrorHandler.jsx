import axios from 'axios';

import { configItemActions } from '../actions';

class ErrorHandler {

  store = null

  init(store) {
    this.store = store;

    var self = this;
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
        self.store.dispatch(configItemActions.showErrorMessage(self.extractErrorMessage(error)));
      return Promise.reject(error);
    });
  }

  extractErrorMessage(error) {
    if (error.response) {
      if (error.response.status === 404) {
        return 'Item not found';
      } else if (error.response.data && error.response.data.length > 0) {
        return error.response.data;
      } else {
        return 'Unspecified error occurred';
      }
    } else {
      return error.message;
    }
  }
}

export default new ErrorHandler();