import React, { Component } from 'react'
import TextInput from './text-input'

class Email extends Component {

  render () {
    return (
      <div>
        <TextInput
          formValidating={this.props.formValidating}
          fullWidth={true}
          name='Email'
          placeholder="Email Address"
          type="email"
          {...this.props}
        />
      </div>
    )
  }
}

export default Email

