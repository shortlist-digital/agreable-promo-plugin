import React, { Component } from 'react'
import TextInput from './text-input'

class FullName extends Component {

  render () {
    return (
      <div>
        <TextInput
          name="FirstName"
          onUpdate={this.props.onUpdate}
          placeholder="First Name"
          type="text"
          {...this.props.FirstName}
        />
        <TextInput
          name="LastName"
          onUpdate={this.props.onUpdate}
          placeholder="Last Name"
          type="text"
          {...this.props.LastName}
        />
      </div>
    )
  }
}

export default FullName
