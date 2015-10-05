import React, { Component } from 'react'
import entities from 'entities'

import Checkbox from './checkbox'

class Terms extends Component {

  render() {
    return (
      <div className='agreable-promo__terms'>
        <div className='agreable-promo__terms-column'>
          <Checkbox
            name='OptInTermsAndConditions'
            {...this.props}
          />
        </div>
        <div className='agreable-promo__terms-column'>
          <a className='agreable-promo__show-terms'>Show terms and conditions</a>
        </div>
      </div>
    )
  }

}

export default Terms
