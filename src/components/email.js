import React, { Component } from 'react'
import TextInput from './text-input'

class Email extends Component {

  render () {
    return (
      <div>
        <TextInput
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

