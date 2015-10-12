import React, { Component } from 'react'
import Modal from 'react-modal'
import * as modalStyles from '../modal-styles'
import Email from '../components/email'
import FullName from '../components/full-name'
import Address from '../components/address'
import Terms from '../components/terms'
import OptIns from '../components/optins'
import TextInput from '../components/text-input'
import CalaisClient from 'calais-js-client'

class FormScreen extends Component {

  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor() {
    super()
    console.log('form store', this.context)
    this.state = {
      formSubmitting: false,
      formValidating: false,
      isModalOpen: false,
      modalMessage: ''
    }
  }

  componentDidMount() {
    const { passport } = this.props.promoData
    this.calaisClient = new CalaisClient(passport.id, passport.shared_secret)
  }

  _isFieldValid = (fieldObject, field) => {
    let isValid = true
    if (fieldObject.valid === false) {
      console.log(field, 'false at not valid 1')
      isValid = false
    }

    if (fieldObject.required && (!fieldObject.value)) {
      isValid = false
      console.log(field, 'false at not valid 2')
    }

    if (fieldObject.validator && !fieldObject.valid) {
      isValid = false
      console.log(field, 'false at not valid 3')
    }

    console.log(field, ':', fieldObject, 'valid: ', isValid)
    return isValid
  }

  _isStoreValid = () => {
    let user = this.context.store.getState().userData
    let validChecks = []
    for (let field in user) {
      validChecks.push(this._isFieldValid(user[field], field))
    }

    // Nice new ES6 feature - Check all the returned
    // values in the array are true
    return validChecks.every(check => check === true)
  }

  _postToCalais = () => {
    let { userData } = this.context.store.getState()
    let dataRecord = {}
    for (let field in userData) {
      dataRecord[field] = userData[field].value
    }

    this.calaisClient.setDataRecord(dataRecord)
    this.calaisClient.post().then(this._handleSubmitSuccess, this._handleSubmitFailure)
  }

  _handleSubmitSuccess = () => {
    this.props.nextScreen()
  }

  _handleSubmitFailure = (errObject) => {
    let errorMessages = {
      'Unique check failed': 'According to our records, you\'ve already entered this competition!',
      'ERROR_CONTACT_SUPPRESSED': 'According to our records, you\'ve sent us an unsubscribe request in the past.'
    }
    this.setState({
      formSubmitting: false,
      isModalOpen: true,
      modalMessage: errorMessages[errObject.message] ? errorMessage[errObject.message] : errObject.message
    })
  }

  _handleSubmit = () => {
    if (this._isStoreValid()) {
      this.setState({formSubmitting: true})
      this._postToCalais()
    } else {
      this.setState({formValidating: true})
    }
  }

  _renderFields = () => {
    const { fields } = this.props.promoData
    let fieldComponents = []
    for (let field of fields) {
      switch (field) {
        case 'email':
          fieldComponents.push(
            <Email
              key={field}
              onUpdate={this.props.updateField}
              {...this.props.userData.Email}
              {...this.state}
            />
          )
          break
        case 'telephoneNumber':
          fieldComponents.push(
            <TextInput
              key={field}
              fullWidth={true}
              onUpdate={this.props.updateField}
              name='Telephone'
              placeholder='Telephone Number'
              type='tel'
              {...this.props.userData.Telephone}
              {...this.state}
            />
          )
          break
        case 'address':
          fieldComponents.push(
            <Address
              key={field}
              onUpdate={this.props.updateField}
              {...this.props.userData}
              {...this.state}
            />
          )
          break
        case 'fullName':
          fieldComponents.push(
            <FullName
              key={field}
              onUpdate={this.props.updateField}
              FirstName={this.props.userData.FirstName}
              LastName={this.props.userData.LastName}
              {...this.state}
            />
          )
          break
      }
    }

    return fieldComponents
  }

  _renderOptIns = () => {
    if (this.props.promoData.optins) {
      return (
        <OptIns
          formValidating={this.state.formValidating}
          onUpdate={this.props.updateCheckbox}
          userData={this.props.userData}
          optins={this.props.promoData.optins}
        />
      )
    } else return null
  }

  render() {
    return (
      <div>
        {this._renderFields()}
        {this._renderOptIns()}
        <Terms
          formValidating={this.state.formValidating}
          onUpdate={this.props.updateCheckbox}
          {...this.props.promoData.termsAndConditions}
          {...this.props.userData.OptInTermsConditions}
        />
        <button
          className='agreable-promo__button agreable-promo__button--submit'
          onClick={this._handleSubmit}
        >
          {this.state.formSubmitting ? 'Loading...' : 'Submit'}
        </button>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.setState.bind(this, {isModalOpen: false})}
          style={modalStyles}
        >
          <h2 style={{textAlign:'center'}}>Submission error:</h2>
          <p>{this.state.modalMessage}</p>
        </Modal>
      </div>
    )
  }
}

export default FormScreen
