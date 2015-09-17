import React, { Component } from 'react'
import entities from 'entities'

class Terms extends Component {

  render () {
    return (
      <div>
        <label className="agreable-promo__label">
          Terms & Conditions:
        </label>
        <textarea className="agreable-promo__textarea" disabled="true" value={entities.decodeHTML(this.props.termsAndConditions)}>
        </textarea>
        <div className="agreable-promo__optin">
          <label className="agreable-promo__checkbox-label">
            <input
              type="checkbox"
              className="agreable-promo__checkbox"
              name="terms-and-conditions"
              onChange={this.props.reportTermsAccepted}
              value={this.props.checked}
            />
            {this.props.termsAndConditionsLabel}
          </label>  
        </div>
      </div>
    )
  }

}

module.exports = Terms
