import React, { Component } from 'react'

class AnswerButton extends Component {

	_handleClick = () => {
		this.props.selectAnswer(this.props.index)
	}

  render() {
    return (
      <button
        className='agreable-promo-button'
        onClick={this._handleClick}
      >
        {this.props.answer_text}
      </button>

    )
  }
}

export default AnswerButton
