import { dispatch } from 'redux'
import React, { Component } from 'react' 
import Email from './components/email'
import FullName from './components/full-name'
import Address from './components/address'

import updateField from './actions'

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
              {...this.props.userData.Email}
              onUpdate={(object)=> dispatch(updateField(object)}
            />
          )
          break
        case 'address':
          fieldComponents.push(<Address key={field} />)
          break
        case 'fullName':
          fieldComponents.push(<FullName key={field}/>)
          break
      }
    }
    console.log(fieldComponents)
    return fieldComponents
  }

  render () {
    return (
      <div>
        {this._renderFields()}
      </div>
    )
  }
}

export default FormScreen
