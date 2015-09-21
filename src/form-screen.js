import React, { Component } from 'react' 
import Email from './components/email'
import FullName from './components/full-name'
import Address from './components/address'
import Terms from './components/terms'
import OptIns from './components/optins'

import TextInput from './components/text-input'

class FormScreen extends Component {

  constructor() {
    super()
    this.state = {
      formSubmitting: false,
      formValidating: false
    }
  }


  _handleSubmit = () => {
    if (this.props.isStoreValid()) {
      this.setState({formSubmitting: true})
      this.props.submit()
    } else {
      this.setState({formValidating: true})
    }
  }

  _renderFields = () => {
    const { fields } = this.props.promoData
    let fieldComponents = []
    for (let field of fields) {
      console.log(field)
      switch (field) {
        case 'email':
          fieldComponents.push(
            <Email
              formValidating={this.state.formValidating}
              key={field}
              onUpdate={this.props.updateField}
              {...this.props.userData.Email}
            />
          )
          break
        case 'telephoneNumber':
          fieldComponents.push(
            <TextInput
              formValidating={this.state.formValidating}
              key={field}
              fullWidth={true}
              onUpdate={this.props.updateField}
              name='Telephone'
              placeholder="Telephone Number"
              type="tel"
              {...this.props.userData.Telephone}
            />
          )
          break
        case 'address':
          fieldComponents.push(
            <Address
              key={field}
              formValidating={this.state.formValidating}
              onUpdate={this.props.updateField}
              Address1={this.props.userData.Address1}
              Address2={this.props.userData.Address2}
              Address3={this.props.userData.Address3}
              PostCode={this.props.userData.PostCode}
            />
          )
          break
        case 'fullName':
          fieldComponents.push(
            <FullName
              formValidating={this.state.formValidating}
              key={field}
              onUpdate={this.props.updateField}
              FirstName={this.props.userData.FirstName}
              LastName={this.props.userData.LastName}
            />
          )
          break
      }
    }
    console.log(fieldComponents)
    return fieldComponents
  }

  _renderOptIns = () => {
    if (this.props.promoData.optins.length) {
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

  render () {
    return (
      <div>
        {this._renderFields()}
        {this._renderOptIns()}
        <Terms
          formValidating={this.state.formValidating}
          onUpdate={this.props.updateCheckbox}
          {...this.props.promoData.termsAndConditions}
          {...this.props.userData.OptInTermsAndConditions}
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

export default FormScreen
