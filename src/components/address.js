import React, { Component } from 'react'
import classNames from 'classnames'

class Address extends Component {

  render () {

    var Address1Classes = classNames('agreable-promo__input')
    var Address2Classes = classNames('agreable-promo__input')
    var Address3Classes = classNames('agreable-promo__input')
    var PostCodeClasses = classNames('agreable-promo__input')

    return (
      <div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 1:
          </label>
          <input
            className={Address1Classes}
            name="Address1"
            placeholder="Address 1"
            type="text"
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 2:
          </label>
          <input
            className={Address2Classes}
            name="Address2"
            placeholder="Address 2"
            type="text"
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 3:
          </label>
          <input
            className={Address3Classes}
            name="Address3"
            placeholder="Address 3"
            type="text"
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          PostCode:
          </label>
          <input
            className={PostCodeClasses}
            name="PostCode"
            placeholder="Post Code"
            type="text"
          />
        </div>
      </div>
    )
  }
}

export default Address
