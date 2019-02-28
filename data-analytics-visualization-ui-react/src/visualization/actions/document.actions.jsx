import axios from 'axios';
import { documentConstants } from '../constants'
import Ajax from '../utilities/Ajax';
import { visualizationActions } from '../actions'

export const documentActions = {
  showDocument,
  showDocumentData,
  hideDocument,
  showDocumentLoader,
  hideDocumentLoader,
  updateDocumentData,
  resetSelectedPoints
}

/*
 * action creators
 */

function showDocument(document, modalSrc, activeDocuments, lineChartId, pointId) {

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
          modalSrc.push({"imageName":document, "url": imageUrl, "lineChartId": lineChartId, "pointId": pointId});}
        else{
          modalSrc.splice(0, 1);
          modalSrc.push({"imageName":document, "url": imageUrl, "lineChartId": lineChartId, "pointId": pointId});
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

function resetSelectedPoints(){

  return function (dispatch, getState) 
  {
    dispatch(hideDocument());
    const clone =  Object.assign({}, getState().data);
    const timeSeries = getState().data.timeSeries.slice(0);
    console.log(timeSeries);
    clone.timeSeries = timeSeries;
    dispatch(visualizationActions.reloadData(clone))
  }
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