import React, { Component } from 'react'

class ValidationMessage extends Component {
  render() {
    var check = (this.props.validationMessage && this.props.formValidating && !this.props.valid && this.props.required)

    // Return validation message or blank space
    var nbspEntity = String.fromCharCode(160)
    return (
      <span className='agreable-promo__validation-message'>
        {check ? this.props.validationMessage : nbspEntity}
      </span>
    )
  }
}

export default ValidationMessage
