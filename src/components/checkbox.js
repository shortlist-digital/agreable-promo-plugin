import React, { Component } from 'react'
import ValidationMessage from './validation-message'

class Checkbox extends Component {

  render() {
    return (
      <div className='agreable-promo__optin'>
        <label className='agreable-promo__checkbox-label'>
          <input
            type='checkbox'
            className='agreable-promo__checkbox'
            name={this.props.name}
            checked={this.props.value}
            onChange={this.props.onUpdate}
          />
          {this.props.label}
        </label>
        {!this.props.noValidation &&
          <ValidationMessage
            {...this.props}
          />
        }
      </div>
    )
  }
}

Checkbox.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool,
  onUpdate: React.PropTypes.func.isRequired
}

export default Checkbox
