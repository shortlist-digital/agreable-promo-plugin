import React, { Component } from 'react'

class EnterScreen extends Component {

  render() {
    return (
      <button
        onClick={this.props.nextScreen}
        className='agreable-promo__button agreable-promo__button--enter'
      >
        Enter
      </button>
    )
  }
}

EnterScreen.propTypes = {
  nextScreen: React.PropTypes.func.isRequired
}

export default EnterScreen
