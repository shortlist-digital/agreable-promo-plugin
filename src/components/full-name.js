var classNames = require('classnames')
var React = require('react')

class FullName extends React.Component {

  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      firstNameInitial: true,
      lastNameInitial: true
    }
  }
  

  _handleFirstName = (event) => {
    var firstName = event.target.value
    this.setState({
      firstNameInitial: false,
      firstName: firstName
    })
    this.props.reportFirstName(firstName)
  }

  _handleLastName = (event) => {
    var lastName = event.target.value
    this.setState({
      lastNameInitial: false,
      lastName: lastName
    })
    this.props.reportLastName(lastName)
  }

  render () {
    var firstNameClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.firstName.length < 2) && !this.state.firstNameInitial,
      'agreable-promo__input--valid': this.state.firstName.length > 1
    })
    var lastNameClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.lastName.length < 2) && !this.state.lastNameInitial,
      'agreable-promo__input--valid': (this.state.lastName.length > 1)
    })
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
            onChange={this._handleFirstName}
            name="firstName"
            placeholder="First Name"
            type="text"
            value={this.state.firstName}
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
            onChange={this._handleLastName}
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={this.state.lastName}
          />
        </div>
      </div>
    )
  }
}

module.exports = FullName
