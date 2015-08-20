var React = require('react')
var classNames = require('classnames')

class Address extends React.Component {

  constructor () {
    super()
    this.state = {
      Address1: null,
      Address2: null,
      Address3: null,
      PostCode: null
    }
  }

  _handleUpdate = (event) => {
    var name = event.target.name
    var value = event.target.value
    switch (name) {
      case 'Address1':
        this.setState({Address1: value})
        break
      case 'Address2':
        this.setState({Address2: value})
        break
      case 'Address3':
        this.setState({Address3: value})
        break
      case 'PostCode':
        this.setState({PostCode: value.toUpperCase()})
        break
    }
    var object = {}
    object[name] = value
    this.props.reportAddress(object)
  }

  render () {

    var Address1Classes = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.Address1 && this.state.Address1.length < 3),
      'agreable-promo__input--valid': (this.state.Address1 && this.state.Address1.length > 2)
    })

    var Address2Classes = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.Address2 && this.state.Address2.length < 3),
      'agreable-promo__input--valid': (this.state.Address2 && this.state.Address2.length > 2)

    })

    var Address3Classes = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.Address3 && this.state.Address3.length < 3),
      'agreable-promo__input--valid': (this.state.Address3 && this.state.Address3.length > 2)
    })

    var PostCodeClasses = classNames('agreable-promo__input', {
      'agreable-promo__input--invalid': (this.state.PostCode && this.state.PostCode.length < 3),
      'agreable-promo__input--valid': (this.state.PostCode && this.state.PostCode.length > 2)

    })

    return (
      <div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 1:
          </label>
          <input
            className={Address1Classes}
            onChange={this._handleUpdate}
            name="Address1"
            placeholder="Address 1"
            type="text"
            value={this.state.Address1}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 2:
          </label>
          <input
            className={Address2Classes}
            onChange={this._handleUpdate}
            name="Address2"
            placeholder="Address 2"
            type="text"
            value={this.state.Address2}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          Address 3:
          </label>
          <input
            className={Address3Classes}
            onChange={this._handleUpdate}
            name="Address3"
            placeholder="Address 3"
            type="text"
            value={this.state.Address3}
          />
        </div>
        <div className="agreable-promo--half">
          <label className="agreable-promo__label">
          PostCode:
          </label>
          <input
            className={PostCodeClasses}
            onChange={this._handleUpdate}
            name="PostCode"
            placeholder="Post Code"
            type="text"
            value={this.state.PostCode}
          />
        </div>
      </div>
    )
  }
}

module.exports = Address

