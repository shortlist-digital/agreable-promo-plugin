import checkEmailValid from 'check-email-valid'
import postcodeValidator from 'postcode-validator'

let validators = {
  email: function (emailString) {
    return checkEmailValid(emailString)
  },

  text: function (textString) {
    return console.log('validating text: ', textString)
  },

  selected: function (value) {
    return console.log('validating selected: ', value)
  },

  postcode: function (postcodeString) {
    return postcodeValidator.validate(postcodeString, 'UK')
  },
  phone: function (number) {
    return console.log('validating hone number: ', number)
  }

}

export default validators
