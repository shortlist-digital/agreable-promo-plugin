var React = require('react')
var classNames = require('classnames')

class Address extends React.Component {

  constructor () {
    super()
    this.state = {
      addressOne: null,
      addressTwo: null,
      addressThree: null,
      postcode: null
    }
  }

  _handleUpdate = (event) => {
    var name = event.target.name
    var value = event.target.value
    switch (name) {
      case 'addressOne':
        this.setState({addressOne: value})
        break
      case 'addressTwo':
        this.setState({addressTwo: value})
        break
      case 'addressThree':
        this.setState({addressThree: value})
        break
      case 'postcode':
        this.setState({postcode: value.toUpperCase()})
        break
    }
  }

  render () {

    var addressOneClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.addressOne && this.state.addressOne.length < 3),
      'agreable-promo__input--valid': (this.state.addressOne && this.state.addressOne.length > 2)
    })

    var addressTwoClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.addressTwo && this.state.addressTwo.length < 3),
      'agreable-promo__input--valid': (this.state.addressTwo && this.state.addressTwo.length > 2)

    })

    var addressThreeClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.addressThree && this.state.addressThree.length < 3),
      'agreable-promo__input--valid': (this.state.addressThree && this.state.addressThree.length > 2)
    })

    var postcodeClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.postcode && this.state.postcode.length < 3),
      'agreable-promo__input--valid': (this.state.postcode && this.state.postcode.length > 2)

    })

    return (
      <div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 1:
          </label>
          <input
            className={addressOneClasses}
            onChange={this._handleUpdate}
            name="addressOne"
            placeholder="Address 1"
            type="text"
            value={this.state.addressOne}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 2:
          </label>
          <input
            className={addressTwoClasses}
            onChange={this._handleUpdate}
            name="addressTwo"
            placeholder="Address 2"
            type="text"
            value={this.state.addressTwo}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 3:
          </label>
          <input
            className={addressThreeClasses}
            onChange={this._handleUpdate}
            name="addressThree"
            placeholder="Address 3"
            type="text"
            value={this.state.addressThree}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Postcode:
          </label>
          <input
            className={postcodeClasses}
            onChange={this._handleUpdate}
            name="postcode"
            placeholder="Postcode"
            type="text"
            value={this.state.postcode}
          />
        </div>
      </div>
    )
  }
}

module.exports = Address

