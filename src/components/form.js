var React = require('react')

var Optins = require('./optins.js')
var Terms = require('./terms.js')
var Email = require('./email.js')
var FullName = require('./full-name.js')
var Address = require('./address.js')
var Competition = require('./competition.js')

class Form extends React.Component {
  constructor () {
    super()
    this.state = {
      Location: window.location.pathname
    }
  }

  componentDidMount () {
    console.log('Form: ', this.props)
  }

  _buildFormByField () {
    var fields = []
    if (this.props.fields) {
      this.props.fields.map((field, index) => {
        switch (field) {
          case 'fullName':
            fields.push(
              <FullName
                reportFirstName={this._handleFirstName}
                reportLastName={this._handleLastName}
              />
            )
            break
          case 'address':
            fields.push(
              <Address
                reportAddress={this._handleAddress}/>
            )
            break
          case 'email':
            fields.push(
              <Email
                reportEmail={this._handleEmail}/>
            )
            break
        }
      }.bind(this))
    }
    return fields
  }

  _handleAddress = (addressObject) => {
    this.setState(addressObject)
  }

  _handleEmail = (emailString) => {
    this.setState({
      Email: emailString
    })
  }

  _handleFirstName = (firstNameString) => {
    this.setState({
      FirstName: firstNameString
    })
    console.log('form reporting firstNameString: ', firstNameString) 
  }

  _handleLastName = (lastNameString) => {
    this.setState({
      LastName: lastNameString
    })
    console.log('form reporting lastNameString: ', lastNameString) 
  }

  _handleOptins = (optinsObject) => {
    this.setState(optinsObject)
  }

  _handleTerms = (termsBoolean) => {
    this.setState({
      OptInTermsConditions: termsBoolean
    })
  }

  _handleSubmit = () => {
    console.log('Current form state: ', this.state)
  }

  render () {
    var fields = this._buildFormByField()
    return (
      <div>
        {fields}
        <Optins
          optins={this.props.optins}
          reportOptins={this._handleOptins}
        />
        <Terms
          termsAndConditionsLabel={this.props.terms_and_conditions_label}
          termsAndConditions={this.props.terms_and_conditions}
          reportTerms={this._handleTerms}
        />
        <button
          className="agreable-promo__button agreable-promo__button--submit"
          onClick={this._handleSubmit}
        >
          Submit
        </button>
      </div>
    )
  }
}

module.exports = Form
