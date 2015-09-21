import checkEmailValid from 'check-email-valid'
import postcodeValidator from 'postcode-validator'

let validators = {
  email: function (emailString) {
    return checkEmailValid(emailString)
  },

  text: function (textString) {
    return (textString.length >= 2)
  },

  selected: function (value) {
    return (!(value !== undefined || value !== ""))
  },

  postcode: function (postcodeString) {
    return postcodeValidator.validate(postcodeString, 'UK')
  },
  phone: function (number) {
    return (/^(?=.*\d)[\d ]+$/.test(number) && (number.length > 9))
  }
}

export default validators
