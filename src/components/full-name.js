import React, { Component } from 'react'
import TextInput from './text-input'

class FullName extends Component {

  render() {
    return (
      <div>
        <TextInput
          formValidating={this.props.formValidating}
          name='FirstName'
          onUpdate={this.props.onUpdate}
          placeholder='First Name'
          type='text'
          {...this.props.FirstName}
        />
        <TextInput
          formValidating={this.props.formValidating}
          name='LastName'
          onUpdate={this.props.onUpdate}
          placeholder='Last Name'
          type='text'
          {...this.props.LastName}
        />
      </div>
    )
  }
}

export default FullName
