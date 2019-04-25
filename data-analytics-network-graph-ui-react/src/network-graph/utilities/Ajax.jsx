class Ajax {

  NETWORK_GRAPH_BASE_PATH = 'graph'

  NETWORK_GRAPH_FILE_PATH = 'file'

  NETWORK_GRAPH_GRAPHS_PATH = 'graphs'

  NETWORK_GRAPH_TOP_NODES = 'top'

  NETWORK_GRAPH_NEIGHBORS = 'neighbors'

  NETWORK_GRAPH_DATE_PATH = 'dates'

  NETWORK_GRAPH_TIMESTAMPS_PATH = 'timestamps'


  baseUrl = null

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
      console.log(parameters)
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

  isLocalDeployment() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return true;
    } else {
      return false;
    }
  }

  buildUrlParameters(filters) {

    var queryString = '';
    for (var prop in filters) {
      if (!filters.hasOwnProperty(prop)) continue;
      if (filters[prop].length === 0) continue;
      if(Array.isArray(filters[prop])) {
        filters[prop] =  "[" + filters[prop] +"]";
      }
      queryString += (prop + "=" + filters[prop]+",");
    }
    return queryString;
  }

}

export default new Ajax();