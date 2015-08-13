var React = require('react')

class Optins extends React.Component {
  
  componentDidMount = () => {
    console.log(this.props)
  }

  _renderOptins () {
    var optinViews = []
    if (this.props.optins.length) {
      this.props.optins.map((optin, index) => {
        optinViews.push(
          <div className="agreable-promo__optin">
            <label class="agreable-promo__checkbox-label">
              <input type="checkbox" className="agreable-promo__checkbox"/>
              {optin.optin_label}
            </label>  
          </div>
        )
      })
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
