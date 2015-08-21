var React = require('react')
var entities = require('entities')

class Terms extends React.Component {

  render () {
    return (
      <div>
        <label className="agreable-promo__label">
          Terms & Conditions:
        </label>
        <textarea className="agreable-promo__textarea" disabled="true">
          {entities.decodeHTML(this.props.termsAndConditions)}
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
