import React, { Component } from 'react'
import ValidationMessage from './validation-message'

class Checkbox extends Component {
  _svgClass = () => {
    let svgClass = 'agreable-promo__checkbox__tick'
    if (this.props.value) {
      svgClass = svgClass + ' agreable-promo__checkbox__tick--true'
    }

    return svgClass
  }

  render() {
    return (
      <div
        className='agreable-promo__checkbox-wrapper'
        onClick={this.props.onUpdate.bind(this, {target:{name:this.props.name, value:this.props.value}})}
      >
        <label className='agreable-promo__checkbox-label'>
          {this.props.label}
        </label>
        <div className='agreable-promo__checkbox'>
          <svg
            className={this._svgClass()}
            viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16'
             >
             </path>
          </svg>
        </div>
        {!this.props.noValidation &&
          <ValidationMessage
            {...this.props}
          />
        }
      </div>
    )
  }
}

Checkbox.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool,
  onUpdate: React.PropTypes.func.isRequired
}

export default Checkbox
