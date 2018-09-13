import axios from 'axios';
import { documentConstants } from '../constants'
import Ajax from '../utilities/Ajax';

export const documentActions = {
  showDocument,
  showDocumentData,
  hideDocument,
  showDocumentLoader,
  hideDocumentLoader
}

/*
 * action creators
 */

function showDocument(document) {

  return function (dispatch) {

    var resourceUrl = Ajax.buildUrl(Ajax.DOCUMENTS_BASE_PATH + '/' + document + '/data', null);

    dispatch(showDocumentLoader())

    return axios({
      url: resourceUrl,
      method: 'get',
      withCredentials: true,
      responseType: 'blob',
      headers: {
        'Accept': 'application/octet-stream',
      }
    })
      .then(response => {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(response.data);
        dispatch(showDocumentData(imageUrl))

        dispatch(hideDocumentLoader(imageUrl))
      })
      .catch(response => {
        alert(response);
      })
  }
}

function showDocumentData(url) {
  return { type: documentConstants.SHOW_DOCUMENT, url };
}

function hideDocument() {
  return { type: documentConstants.HIDE_DOCUMENT };
}

function showDocumentLoader() {
  return { type: documentConstants.SHOW_DOCUMENT_LOADER };
}

function hideDocumentLoader() {
  return { type: documentConstants.HIDE_DOCUMENT_LOADER };
}