import React, { Component } from 'react'
import classNames from 'classnames'

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
            name="FirstName"
            onChange={this.props.onUpdate}
            placeholder="First Name"
            type="text"
            value={this.props.FirstName.value}
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
            name="LastName"
            onChange={this.props.onUpdate}
            placeholder="Last Name"
            type="text"
            value={this.props.LastName.value}
          />
        </div>
      </div>
    )
  }
}

export default FullName
