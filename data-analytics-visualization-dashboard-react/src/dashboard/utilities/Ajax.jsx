class Ajax {

  CONFIGURATIONS_BASE_PATH = 'configurations'
  VISUALIZATIONS_BASE_PATH = 'visualizations'
  DOCUMENTS_BASE_PATH = 'dataDocuments'
  DASHBOARD_BASE_PATH = "dashboard"
  
  WORKSPACE_ITEMS = "items"

  baseUrl = null
  workspaceUrl = null

  getWorkspaceUrl() {
    return this.workspaceUrl;
  }

  setWorkspaceUrl(workspaceUrl) {
    this.workspaceUrl = workspaceUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  buildUrl(path, parameters) {
    var url = this.isLocalDeployment() ?
      this.buildLocal(path, parameters) :
      this.buildPortlet(path, parameters);
      
    return url;
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

  buildWorkspaceUrl(path, parameters) {
    var url = this.isLocalDeployment() ?
      this.buildWWorkspaceLocal(path, parameters) :
      this.buildWWorkspacePortlet(path, parameters);
      
    return url;
  }

  buildWWorkspaceLocal(path, parameters) {
    var url = this.workspaceUrl + '/' + path;
    if (parameters) {
      url += ('?' + parameters);
    }
    return url;
  }

  buildWWorkspacePortlet(path, parameters) {
    var resourceURL = this.workspaceUrl.replace('%7Burl%7D', path);
    return resourceURL.replace('%7Bparameters%7D', parameters ? parameters : '');
  }

  isLocalDeployment() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return true;
    } else {
      return false;
    }
  }
}

export default new Ajax();