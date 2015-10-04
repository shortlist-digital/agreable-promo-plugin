import React, { Component } from 'react'
import entities from 'entities'

import Checkbox from './checkbox'

class Terms extends Component {

  render() {
    return (
      <div>
        <Checkbox
          name='OptInTermsAndConditions'
          {...this.props}
        />
      </div>
    )
  }

}

export default Terms
