import React, { Component } from 'react'
import TextInput from './text-input'

class Email extends Component {

  render () {
    return (
      <TextInput
        formValidating={this.props.formValidating}
        fullWidth={true}
        name='Email'
        placeholder="Email Address"
        type="email"
        {...this.props}
      />
    )
  }
}

export default Email

