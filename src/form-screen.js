import React, { Component } from 'react' 
import Email from './components/email'
import FullName from './components/full-name'
import Address from './components/address'
import Terms from './components/terms'
import OptIns from './components/optins'

class FormScreen extends Component {

  componentWillMount () {
    console.log(this.props)
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
              key={field}
              onUpdate={this.props.updateField}
              {...this.props.userData.Email}
            />
          )
          break
        case 'address':
          fieldComponents.push(
            <Address
              key={field}
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
          onUpdate={this.props.updateCheckbox}
          {...this.props.promoData.termsAndConditions}
          {...this.props.userData.OptInTermsAndConditions}
        />
      </div>
    )
  }
}

export default FormScreen
