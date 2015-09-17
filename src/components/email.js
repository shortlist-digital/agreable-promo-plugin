import React, { Component } from 'react'
import classNames from 'classnames'

class Email extends Component {

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
          name='Email'
          className={inputClasses}
          placeholder="Email Address"
          type="email"
          value={this.props.value}
          onChange={this.props.onUpdate}
        />
      </div>
    )
  }

}

export default Email

