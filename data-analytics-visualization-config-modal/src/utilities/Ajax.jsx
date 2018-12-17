import axios from 'axios';

class Ajax {

  CONFIGURATIONS_BASE_PATH = 'configurations'
  DOCUMENTS_BASE_PATH = 'dataDocuments'
  VISUALIZATIONS_BASE_PATH = 'visualizations'

  baseUrl = null
  _isLocalDeployment = true

  getBaseUrl() {
    return this.baseUrl;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  isLocalDeployment() {
    return this._isLocalDeployment;
  }
  
  setIsLocalDeployment(isLocalDeployment) {
    this._isLocalDeployment = isLocalDeployment;
  }

  buildUrl(path, parameters) {
    var url = this.isLocalDeployment() ?
      this.buildLocal(path, parameters) :
      this.buildPortlet(path, parameters);

    return url;
  }

  put(resourceUrl, data) {
    return this.isLocalDeployment() ?
      axios.put(resourceUrl, data) :
      axios.post(resourceUrl, data, {
        headers: {
          'gcube-request-method': 'PUT'
        }
      })
  }

  delete(resourceUrl) {
    return this.isLocalDeployment() ?
      axios.delete(resourceUrl) :
      axios.post(resourceUrl, undefined, {
        headers: {
          'gcube-request-method': 'DELETE'
        }
      })
  }

  buildLocal(path, parameters) {
    var url = this.baseUrl + '/' + path;
    if (parameters) {
      url += ('?' + parameters);
    }
    return url;
  }

  buildPortlet(path, parameters) {
    var resourceURL = this.baseUrl.replace('%7Burl%7D', path);
    return resourceURL.replace('%7Bparameters%7D', parameters ? parameters : '');
  }
}

export default new Ajax();