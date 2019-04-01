import axios from 'axios';
import Ajax from '../utilities/Ajax';

export const geoanalyticsService = {
  getLayers,
  getLayer,
  postLayer
}

function getLayers() {
  var resourceUrl = Ajax.buildUrl(Ajax.GEOANALYTICS_BASE_PATH + '/layers');
  return axios.get(resourceUrl);
}

function getLayer(id){
  var resourceUrl = Ajax.buildUrl(Ajax.GEOANALYTICS_BASE_PATH + '/layers/'+id);
  return axios.get(resourceUrl);
}

function postLayer(formData) {
  var resourceUrl = Ajax.buildUrl(Ajax.GEOANALYTICS_BASE_PATH);
  return axios.post(resourceUrl, formData, {
    headers: { "X-Requested-With": "XMLHttpRequest" }
  });
}