import axios from 'axios';
import { documentConstants } from '../constants'
import Ajax from '../utilities/Ajax';

export const documentActions = {
  showDocument,
  showDocumentData,
  hideDocument,
  showDocumentLoader,
  hideDocumentLoader,
  updateDocumentData
}

/*
 * action creators
 */

function showDocument(document, modalSrc, activeDocuments, lineChartId) {

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
        if(modalSrc.length < activeDocuments){
          modalSrc.push({"imageName":document, "url": imageUrl, "lineChartId": lineChartId});}
        else{
          modalSrc.splice(0, 1);
          modalSrc.push({"imageName":document, "url": imageUrl, "lineChartId": lineChartId});
        }
        dispatch(showDocumentData(modalSrc))

        dispatch(hideDocumentLoader(modalSrc))
      })
      .catch(response => {
        alert(response);
      })
  }
}


function updateDocumentData(modalSrc){
  return function (dispatch) {
    dispatch(showDocumentData(modalSrc))
    dispatch(hideDocumentLoader(modalSrc))
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