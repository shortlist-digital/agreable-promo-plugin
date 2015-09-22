import React, { Component } from 'react'

class ValidationMessage extends Component {
  render() {
    if (this.props.validationMessage && this.props.formValidating && !this.props.valid && this.props.required) {
      return (
        <span className='agreable-promo__validation-message'>
        {this.props.validationMessage}
        </span>
      )
    } else {
      return (<span class='agreable-promo__validation-message'> </span>)
    }
  }
}

export default ValidationMessage
