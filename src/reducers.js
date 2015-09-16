import { combineReducers } from 'redux'
import { UPDATE_FIELD, CLEAR_FIELD, VALIDATE_FIELD, NEXT_SCREEN, PREV_SCREEN, ScreenNames } from './actions'

const { ENTER_SCREEN } = ScreenNames

const initialState = require('./data-structure.json')

initialState.screen = {
  currentScreen: ENTER_SCREEN,
  prevScreen: false
}

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

function screen(state = initalState.screen, action) {
  console.log(action)
  switch(action.type) {

  case NEXT_SCREEN:
    return {
      prevScreen: state.currentScreen ? state.currentScreen : false,
      currentScreen: action.screenName
    }

  case PREV_SCREEN:
    return {
      prevScreen: false,
      currentScreen: state.prevScreen ? state.prevScreen : false
    }

  default:
    return state
  }
}

export default function promotionsApp(state = initialState, action) {
  return {
    userData: userData(state.userData, action),
    screen: screen(state.screen, action)
  } 
}





