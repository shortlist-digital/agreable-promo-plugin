import React, { Component } from 'react'
import AnswerButton from '../components/answer-button'

class CompetitionScreen extends Component {

  _handleSelectAnswer = (answerIndex) => {
    const { answers } = this.props.promoData.competition
    console.log(answers[answerIndex])
    this.props.nextScreen()
  }

  render() {
    const { answers, question } = this.props.promoData.competition

    var answerNodes = answers.map((answerData, index) => {
      return <AnswerButton
        key={index}
        {...answerData}
        index={index}
        selectAnswer={this._handleSelectAnswer}
      />
    })

    return (
      <div>
        <h1 style={{textAlign: 'center'}}>{question}</h1>
        {answerNodes}
      </div>
    )
  }
}

export default CompetitionScreen
