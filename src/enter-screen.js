import React, { Component } from 'react'

class EnterScreen extends Component {

  render() {
    return (
      <button
        onClick={this.props.onEnterClick}
        className="agreable-promo__button agreable-promo__button--enter"
      >
        Enter
      </button> 
    )
  }
}

export default EnterScreen
