// Force a commit
var React = require('react')

var Optins = require('./optins.js')
var Terms = require('./terms.js')
var Email = require('./email.js')
var FullName = require('./full-name.js')
var Address = require('./address.js')
var Competition = require('./competition.js')
var CalaisClient = require('calais-js-client')

class Form extends React.Component {
  constructor () {
    super()
    this.state = {
      submitting: false,
      OptInTermsConditions: false,
      Location: window.location.pathname
    }
  }


  componentDidMount () {
    this.calaisClient = new CalaisClient(this.props.passport.id, this.props.passport.shared_secret)
    this.setState({
      PostId: this.props.id
    })
    if (this.props.competitionAnswer) {
      this.setState({
        AnswerCorrect: this.props.competitionAnswer.answer_correct,
        AnswerOption: this.props.competitionAnswer.answer_text
      })
    }
  }

  _buildFormByField () {
    var fields = []
    if (this.props.fields) {
      this.props.fields.map((field, index) => {
        switch (field) {
          case 'fullName':
            fields.push(
              <FullName
                key={index}
                reportFirstName={this._handleFirstName}
                reportLastName={this._handleLastName}
              />
            )
            break
          case 'address':
            fields.push(
              <Address
                key={index}
                reportAddress={this._handleAddress}/>
            )
            break
          case 'email':
            fields.push(
              <Email
                key={index}
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
  }

  _handleLastName = (lastNameString) => {
    this.setState({
      LastName: lastNameString
    })
  }

  _handleOptins = (optinsObject) => {
    this.setState(optinsObject)
  }

  _handleTerms = (changeEvent) => {
    var termsBoolean = changeEvent.target.checked
    this.setState({
      OptInTermsConditions: termsBoolean
    })
  }

  _handleSubmit = () => {
    if(this.state.submitting) return
    this.setState({message:false})
    if (this.state.OptInTermsConditions) {
      this._postData()
    } else {
      this.setState({message:'Please accept the Terms & Conditions to continue'})
    }
  }

  _postData = () => {
    this.setState({submitting:true})
    this.calaisClient.setDataRecord(this.state)
    this.calaisClient.post().then(this._handleSuccess, this._handleFailure)
    setTimeout(this._handleSuccess, 2000)
  }

  _handleSuccess = (response) => {
    this.setState({submitting:false, submitted: true})
  }

  _handleFailure = (error) => {
    this.setState({submitting:false})
    this.setState({message:`Something went wrong with your submission: ${error}`})
  }

  render () {
    var fields = this._buildFormByField()
    if (this.state.submitted) {
      return <h2 className="agreable-promo__success-message">Successfully submitted!</h2>
    }
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
          reportTermsAccepted={this._handleTerms}
        />
        <button
          className="agreable-promo__button agreable-promo__button--submit"
          onClick={this._handleSubmit}
        >
          {this.state.submitting ? 'Submitting...' : 'Submit'}
        </button>
        {!!this.state.message && <span className="agreable-promo__message agreable-promo__message--error">{this.state.message}</span>}
      </div>
    )
  }
}

module.exports = Form
