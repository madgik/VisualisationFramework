class Ajax {

  CONFIGURATIONS_BASE_PATH = 'configurations';
  VISUALIZATIONS_BASE_PATH = 'visualizations';
  DOCUMENTS_BASE_PATH = 'dataDocuments';
  DASHBOARD_BASE_PATH = "dashboard";
  
  WORKSPACE_ITEMS = "items";

  baseUrl = null
  workspaceUrl = null
  dataMinerUrl = null

  getDataMinerUrl() {
    return this.dataMinerUrl;
  }

  setDataMinerUrl(dataMinerUrl) {
    this.dataMinerUrl = dataMinerUrl;
  }

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
    console.log("Path: " + path);
    console.log(parameters);
    console.log(this.baseUrl);

    var resourceURL = this.baseUrl.replace('%7Burl%7D', path);
    console.log(resourceURL);
    var url = resourceURL.replace('%7Bparameters%7D',  '');
    console.log(url);
    // return url;

    if (parameters) {
      console.log(parameters)
      url += ('&' + parameters);
    }
    return url;
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
    console.log("Path: " + path);
    console.log(parameters);
    console.log(this.workspaceUrl);

    var url = this.workspaceUrl + '/' + path;

    console.log(url);
    // return url;

    if (parameters) {
      console.log(parameters)
      url += ('?' + parameters);
    }
    console.log("final : " + url);

    return url;
  }

  buildDataMinerUrl(path, parameters) {
    var url = this.isLocalDeployment() ?
      this.buildDataMinerLocal(path, parameters) :
      this.buildDataMinerPortlet(path, parameters);
      
    return url;
  }

  buildDataMinerLocal(path, parameters) {
    var url = this.workspaceUrl + '/' + path;
    if (parameters) {
      url += ('?' + parameters);
    }
    return url;
  }

  buildDataMinerPortlet(path, parameters) {
    console.log("Path: " + path);
    console.log(parameters);
    console.log(this.workspaceUrl);

    var url = this.workspaceUrl + '/' + path;

    console.log(url);
    // return url;

    if (parameters) {
      console.log(parameters)
      url += ('?' + parameters);
    }
    console.log("final : " + url);

    return url;
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