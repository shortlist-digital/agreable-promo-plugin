var React = require('react')

class Optins extends React.Component {
 
  componentDidMount = () => {
    this.props.optins.map((optin, index) => {
<<<<<<< HEAD
      var optinKeyString = `ThirdPartyOptIn${index+1}Key`
      var optinValueString = `ThirdPartyOptIn${index+1}Value`
=======
      var optinKeyString = `ThirdPartyOptin${index+1}Key`
      var optinValueString = `ThirdPartyOptin${index+1}Value`
>>>>>>> e0023c976348cbb0f90d80ad0c7843acc3ba1f0a
      var object = {}
      object[optinKeyString] = optin.optin_name
      object[optinValueString] = false
      this.props.reportOptins(object)
    }.bind(this))
  }

  _handleOptinChange = (optin_name, index, event) => {
    var optinKeyString = `ThirdPartyOptIn${index+1}Key`
    var optinValueString = `ThirdPartyOptIn${index+1}Value`
    var object = {}
    object[optinKeyString] = optin_name
    object[optinValueString] = event.target.checked
    this.props.reportOptins(object)
  }

  _renderOptins = () => {
    var optinViews = []
    if (this.props.optins && this.props.optins.length) {
      this.props.optins.map((optin, index) => {
        optinViews.push(
          <div key={index} className="agreable-promo__optin">
            <label className="agreable-promo__checkbox-label">
              <input
                type="checkbox" 
                className="agreable-promo__checkbox"
                onChange={this._handleOptinChange.bind(this, optin.optin_name, index)}
              />
              {optin.optin_label}
            </label>  
          </div>
        )
      }.bind(this))
      return optinViews
    }
    return null
  }

  render () {
    var optins = this._renderOptins()
    return (
      <div>
        <small>From time to time our partners would like to keep you updated about new products and services. Please check the tickbox if you'd like to hear from anyone you're interested in.</small>
        {optins}
      </div>
    )
  }
}

module.exports = Optins
