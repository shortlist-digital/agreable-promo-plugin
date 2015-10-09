import checkEmailValid from 'check-email-valid'
import postcodeValidator from 'postcode-validator'

export function email(emailString) {
  return checkEmailValid(emailString)
}

export function text(textString) {
  return (textString.length >= 2)
}

export function selected(value) {
  return (!(value !== undefined || value !== ''))
}

export function postcode(postcodeString) {
  return postcodeValidator.validate(postcodeString, 'UK')
}

export function phone(number) {
  return (/^(?=.*\d)[\d ]+$/.test(number) && (number.replace(/\s/g, '').length > 9))
}
