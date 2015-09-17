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
            onChange={this.props.onUpdate}
            placeholder="Address 1"
            type="text"
            value={this.props.Address1.value}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 2:
          </label>
          <input
            className={Address2Classes}
            name="Address2"
            onChange={this.props.onUpdate}
            placeholder="Address 2"
            type="text"
            value={this.props.Address2.value}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 3:
          </label>
          <input
            className={Address3Classes}
            name="Address3"
            onChange={this.props.onUpdate}
            placeholder="Address 3"
            type="text"
            value={this.props.Address3.value}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          PostCode:
          </label>
          <input
            className={PostCodeClasses}
            name="PostCode"
            onChange={this.props.onUpdate}
            placeholder="Post Code"
            type="text"
            value={this.props.PostCode.value.toUpperCase()}
          />
        </div>
      </div>
    )
  }
}

export default Address
