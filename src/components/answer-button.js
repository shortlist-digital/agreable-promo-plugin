import React, { Component } from 'react'

class AnswerButton extends Component {
  render() {
    return (
      <button
        className="agreable-promo-button"
      >
        {this.props.answer_text}
      </button>

    )
  }
}

export default AnswerButton
