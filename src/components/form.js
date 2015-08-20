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
  }

  componentDidMount () {
    console.log('Form: ', this.props)
  }

  _buildFormByField () {
    var fields = []
    if (this.props.fields) {
      console.log('yes fields')
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
    console.log('form reporting addressObject: ', addressObject) 
  }

  _handleEmail = (emailString) => {
    console.log('form reporting emailString: ', emailString) 
  }

  _handleFirstName = (firstNameString) => {
    console.log('form reporting firstNameString: ', firstNameString) 
  }

  _handleLastName = (lastNameString) => {
    console.log('form reporting lastNameString: ', lastNameString) 
  }

  render () {
    var fields = this._buildFormByField()
    return (
      <div>
        {fields}
        <Optins
          optins={this.props.optins}
        />
        <Terms
          termsAndConditionsLabel={this.props.terms_and_conditions_label}
          termsAndConditions={this.props.terms_and_conditions}
        />
        <button className="agreable-promo__submit-button">Submit</button>
      </div>
    )
  }
}

module.exports = Form
