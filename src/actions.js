/*
* Action Types
*/

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const CLEAR_FIELD = 'CLEAR_FIELD'
export const VALIDATE_FIELD = 'VALIDATE_FIELD'

export const NEXT_SCREEN = 'NEXT_SCREEN'
export const PREV_SCREEN = 'PREV_SCREEN'

export function updateField(object) {
  return {
    type: UPDATE_FIELD, 
    name: object.name,
    value: object.value
  }
}

export function clearField(name) {
  return {
    type: CLEAR_FIELD,
    name: name
  }
}

export function validateField(name) {
  return {
    type: VALIDATE_FIELD,
    name: name
  }
}

