import { combineReducers } from 'redux'
import { UPDATE_FIELD, CLEAR_FIELD, VALIDATE_FIELD, NEXT_SCREEN, PREV_SCREEN } from './actions'

const initialState = require('./data-structure.json')

export default function promotionsApp(state = initialState, action) {

  switch (action.type) {

  case UPDATE_FIELD:
    return Object.assign({}, state, {
      "userData": Object.assign({}, state.userData, {
        [action.name]: Object.assign({}, state.userData[action.name], {
          value: action.value
        })
      })
    })

  case CLEAR_FIELD:
    return Object.assign({}, state, {
      "userData": {
        [action.name]: {
          value: ''
        }
      }
    })

  default: 
    return state
  }

}





