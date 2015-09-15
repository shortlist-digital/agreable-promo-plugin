import { combineReducers } from 'redux'
import { UPDATE_FIELD, CLEAR_FIELD, VALIDATE_FIELD, NEXT_SCREEN, PREV_SCREEN } from './actions'

const initialState = require('./data-structure.json')

function userData(state = initialState.userData, action) {
  // Note "state is "userData" object
  switch (action.type) {

  case UPDATE_FIELD:
    return Object.assign({}, state, {
      [action.name]: Object.assign({}, state[action.name], {
        value: action.value
      })
    })

  case CLEAR_FIELD:
    return Object.assign({}, state, {
      [action.name]: Object.assign({}, state[action.name], {
        value: false
      })
    })

  default:
    return state

  }
}

export default function promotionsApp(state = initialState, action) {
  return {
    userData: userData(state.userData, action)
  } 
}





