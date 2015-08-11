var React = require('react')
var classNames = require('classnames')
var checkEmailValid = require('check-email-valid')

class Email extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      isInvalid: false
    }
  }

  _handleEmail = (event) => {
    var email = event.target.value
    var valid = checkEmailValid(email)
    this.setState({
      email: email,
      isInvalid: !valid
    })

    if (valid) {
      this.props.reportEmail(event.target.value)
    }
  }

  componentDidMount () {
    console.log(this.props)
  }

  render () {
    var inputClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': this.state.isInvalid && (this.state.email.length > 6),
      'agreable-promo__input--valid': !this.state.isInvalid && this.state.email.length
    })
    return (
      <div>
        <label
          className="agreable-promo__label"
        >
        Email:
        </label>
        <input
          className={inputClasses}
          onChange={this._handleEmail}
          placeholder="Email Address"
          type="email"
          value={this.state.email}
        />
      </div>
    )
  }

}

module.exports = Email
