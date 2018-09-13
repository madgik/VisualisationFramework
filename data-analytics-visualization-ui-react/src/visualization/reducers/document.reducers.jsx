import update from 'immutability-helper'

import { documentConstants } from '../constants'

const documentDefault = {
  loading: false,
  isModalOpen: false,
  modalSrc: ''
}

export function document(state = documentDefault, action) {
  switch (action.type) {
    case documentConstants.SHOW_DOCUMENT:
      return update(state, {
        isModalOpen: {
          $set: true
        },
        modalSrc: {
          $set: action.url
        }
      });
    case documentConstants.HIDE_DOCUMENT:
      return update(state, {
        isModalOpen: {
          $set: false
        },
        modalSrc: {
          $set: ''
        }
      });
    case documentConstants.SHOW_DOCUMENT_LOADER:
      return update(state, {
        loading: {
          $set: true
        }
      });
    case documentConstants.HIDE_DOCUMENT_LOADER:
      return update(state, {
        loading: {
          $set: false
        }
      });
    default:
      return state;
  }
}
