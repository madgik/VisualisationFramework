import axios from 'axios';
import Ajax from '../utilities/Ajax';

export const configurationService = {
  getConfigurations,
  getConfiguration,
  postConfiguration,
  putConfiguration,
  deleteConfiguration
}

function getConfigurations() {
  var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH);
  return axios.get(resourceUrl);
}

function getConfiguration(id) {
  var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH + '/' + id);
  return axios.get(resourceUrl);
}

function postConfiguration(item) {
  var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH);
  return axios.post(resourceUrl, item);
}

function putConfiguration(item) {
  var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH + '/' + item.id);
  return Ajax.put(resourceUrl, item);
}

function deleteConfiguration(id) {
  var resourceUrl = Ajax.buildUrl(Ajax.CONFIGURATIONS_BASE_PATH + '/' + id);
  return Ajax.delete(resourceUrl);
}
