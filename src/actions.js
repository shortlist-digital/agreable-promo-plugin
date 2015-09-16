/*
* Action Types
*/

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const CLEAR_FIELD = 'CLEAR_FIELD'
export const VALIDATE_FIELD = 'VALIDATE_FIELD'
export const SUBMIT_FORM = 'SUBMIT_FORM'

export const NEXT_SCREEN = 'NEXT_SCREEN'
export const PREV_SCREEN = 'PREV_SCREEN'

export const ScreenNames = {
  ENTER_SCREEN: 'ENTER_SCREEN',
  COMPETITION_SCREEN: 'COMPETITION_SCREEN',
  FORM_SCREEN: 'FORM_SCREEN',
  THANK_YOU_SCREEN: 'THANK_YOU_SCREEN'
}

export function updateField(field) {
  return {
    type: UPDATE_FIELD, 
    name: field.name,
    value: field.value
  }
}

export function clearField(field) {
  return {
    type: CLEAR_FIELD,
    name: field.name
  }
}

export function validateField(name) {
  return {
    type: VALIDATE_FIELD,
    name: name
  }
}

export function nextScreen(screenName) {
  return {
    type: NEXT_SCREEN,
    screenName
  }
}
export function prevScreen(screenName) {
  return {
    type: PREV_SCREEN,
    screenName
  }
}

