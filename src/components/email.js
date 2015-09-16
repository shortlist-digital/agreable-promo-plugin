import React, { Component } from 'react'
import classNames from 'classnames'

class Email extends Component {
  _handleChange (event) {
    var string = event.target.value
    this.props.onUpdate({
      name: 'Email',
      value: string
    })
  }

  render () {
    var inputClasses = classNames('agreable-promo__input')
    return (
      <div>
        <label
          className="agreable-promo__label"
        >
        Email:
        </label>
        <input
          className={inputClasses}
          placeholder="Email Address"
          type="email"
          value={this.props.value}
          onChange={this._handleChange}
        />
      </div>
    )
  }

}

export default Email

