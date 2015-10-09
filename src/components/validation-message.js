import React, { Component } from 'react'
import { spring } from 'react-motion'
import Transition from 'react-motion-ui-pack'

class ValidationMessage extends Component {
  render() {
    var check = (this.props.validationMessage && this.props.formValidating && !this.props.valid && this.props.required)

    // Return validation message or blank space
    var nbspEntity = String.fromCharCode(160)
    return (
      <span className='agreable-promo__validation-message'>
        <div style={{minHeight: '18px'}}>
          <Transition
            onlyChild={true}
            enter={{opacity: 1}}
            leave={{opacity: 0}}
          >
            { check &&
              <span>{check ? this.props.validationMessage : nbspEntity}</span>
            }
          </Transition>
        </div>
      </span>
    )
  }
}

ValidationMessage.propTypes = {
  validationMessage: React.PropTypes.string.isRequired
}

export default ValidationMessage
