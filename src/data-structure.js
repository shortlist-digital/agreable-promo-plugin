// User Data
export const email = {
  'Email': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'email',
    'validationMessage': 'Please enter a valid email address'
  }
}

export const telephoneNumber = {
  'Telephone': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty': false,
    'required': true,
    'validator': 'phone',
    'validationMessage': 'Please enter your telephone number'
  }
}

export const fullName = {
  'FirstName': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'text',
    'validationMessage': 'Please enter your first name'
  },
  'LastName': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'text',
    'validationMessage': 'Please enter your last name'
  }
}

export const address = {
  'Address1': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'text',
    'validationMessage': 'Please enter the first part of your address'
  },
  'Address2': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'text',
    'validationMessage': 'Please enter the second part of your address'
  },
  'Address3': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': false,
    'validator': 'text',
    'validationMessage': 'Please enter the third part of your address'
  },
  'PostCode': {
    'value': '',
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'postcode',
    'validationMessage': 'Please enter a valid UK postcode'
  }
}

export const competition = {
  'AnswerOption': {
    'dirty':false,
    'pristine': true,
    'value': ''
  },
  'AnswerCorrect': {
    'initial': true,
    'pristine': true,
    'dirty':false,
    'value': null
  }
}

export const termsAndConditions = {
  'OptInTermsConditions': {
    'value': false,
    'valid': false,
    'pristine': true,
    'dirty':false,
    'required': true,
    'validator': 'selected',
    'validationMessage': 'Please accept the terms and conditions to enter'
  }
}

export const firstOptIn = {
  'ThirdPartyOptIn1Key': {
    'value': ''
  },
  'ThirdPartyOptIn1Value': {
    'value': false,
    'intial': true
  }
}

export const secondOptIn = {
  'ThirdPartyOptIn2Key': {
    'value': ''
  },
  'ThirdPartyOptIn2Value': {
    'value': false,
    'intial': true
  }
}

export const thirdOptin = {
  'ThirdPartyOptIn3Key': {
    'value': ''
  },
  'ThirdPartyOptIn3Value': {
    'value': false,
    'intial': true
  }
}

export const promoData = {
  'Location': {
    'value': null,
    'required': true
  },
  'PostId': {
    'value': null,
    'required': true
  },
  'sortingoffice': {
    'value': null,
    'required': false
  }
}
