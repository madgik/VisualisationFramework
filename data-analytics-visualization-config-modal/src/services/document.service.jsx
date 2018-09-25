import axios from 'axios';
import Ajax from '../utilities/Ajax';

export const documentService = {
  getDocumentMetadata,
  postDocument
}

function getDocumentMetadata(id) {
  var resourceUrl = Ajax.buildUrl(Ajax.DOCUMENTS_BASE_PATH + '/' + id + '/metadata');
  return axios.get(resourceUrl);
}

function postDocument(formData) {
  var resourceUrl = Ajax.buildUrl(Ajax.DOCUMENTS_BASE_PATH);
  return axios.post(resourceUrl, formData, {
    headers: { "X-Requested-With": "XMLHttpRequest" }
  });
}