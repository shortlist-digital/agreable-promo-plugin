import React, { Component } from 'react'
import entities from 'entities'
import Checkbox from './checkbox'
import Modal from 'react-modal'

class Terms extends Component {

  constructor() {
    super()
    this.state = {
      showTermsModal: false
    }
  }

  _customStyles = {
    overlay: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      zIndex: '2000'
    },
    content: {
      background: 'white',
      fontSize: '14px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      lineHeight: '1.4',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      'maxWidth': '80%',
      'maxHeight': '80vh',
      'zIndex': '50',
      'whiteSpace': 'pre-wrap'
    }
  }

  _toggleTerms = () => {
    this.setState({
      showTermsModal: !this.state.showTermsModal
    })
  }

  render() {
    return (
      <div className='agreable-promo__terms'>

        <div className='agreable-promo__terms-column'>
          <Checkbox
            name='OptInTermsConditions'
            {...this.props}
          />
        </div>

        <div className='agreable-promo__terms-column'>
          <a
            className='agreable-promo__show-terms'
            onClick={this._toggleTerms}
          >
            Show terms and conditions
          </a>
        </div>

        <Modal
          isOpen={this.state.showTermsModal}
          onRequestClose={this._toggleTerms}
          style={this._customStyles}
        >
          <h2
            style={{textAlign:'center'}}
            className='agreable-promo__modal-title'
          >
            Terms & Conditions
          </h2>
          <p>{entities.decodeHTML(this.props.text)}</p>
          <br/>
          <button
            style={{maxWidth: '300px'}}
            className='agreable-promo__button agreable-promo__button--close-modal'
            onClick={this._toggleTerms}
          >Close</button>
        </Modal>

      </div>
    )
  }

}

export default Terms
