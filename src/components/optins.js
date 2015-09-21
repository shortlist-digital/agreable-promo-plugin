import React, { Component } from 'react'
import Checkbox from './checkbox'

class OptIns extends Component {
 
  _renderOptIns = () => {
    var optinViews = []
    this.props.optins.map((optin, index) => {
      var optinValueString = `ThirdPartyOptIn${index+1}Value`
      optinViews.push(
        <Checkbox
          key={index}
          name={optinValueString}
          value={this.props.userData[optinValueString].value}
          onUpdate={this.props.onUpdate}
          label={optin.label}
        />
      )
    }.bind(this))
    return optinViews
  }

  render () {
    var optins = this._renderOptIns()
    var message = ` From time to time our partners would like to keep you updated about new products and services. 
      Please check the tickbox if you'd like to hear from anyone you're interested in.`
    return (
      <div>
        <small>{message}</small>
        {optins}
      </div>
    )
  }
}

export default OptIns
