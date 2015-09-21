import React, { Component } from 'react'

import TextInput from './text-input'

class Address extends Component {

  render () {

    return (
      <div>
        <TextInput
          formValidating={this.props.formValidating}
          name="Address1"
          onUpdate={this.props.onUpdate}
          placeholder="Address 1"
          type="text"
          {...this.props.Address1}
        />
        <TextInput
          formValidating={this.props.formValidating}
          name="Address2"
          onUpdate={this.props.onUpdate}
          placeholder="Address 2"
          type="text"
          {...this.props.Address2}
        />
        <TextInput
          formValidating={this.props.formValidating}
          name="Address3"
          onUpdate={this.props.onUpdate}
          placeholder="Address 3"
          type="text"
          {...this.props.Address3}
        />
        <TextInput
          formValidating={this.props.formValidating}
          name="PostCode"
          onUpdate={this.props.onUpdate}
          placeholder="UK Post Code"
          type="text"
          upperCase={true}
          {...this.props.PostCode}
        />
      </div>
    )
  }
}

export default Address
