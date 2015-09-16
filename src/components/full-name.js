import React, { Component } from 'react'
import classNames from 'classNames'

class FullName extends Component {

  render () {
    var firstNameClasses = classNames('agreable-promo__input')
    var lastNameClasses = classNames('agreable-promo__input')
    return (
      <div>
        <div className="agreable-promo--half">
          <label
            className="agreable-promo__label"
          >
          First Name:
          </label>
          <input
            className={firstNameClasses}
            name="firstName"
            placeholder="First Name"
            type="text"
          />
        </div>

        <div className="agreable-promo--half">
          <label
            className="agreable-promo__label"
          >
          Last Name:
          </label>
          <input
            className={lastNameClasses}
            name="lastName"
            placeholder="Last Name"
            type="text"
          />
        </div>
      </div>
    )
  }
}

export default FullName
