import React, { Component } from 'react'
import AnswerButton from '../components/answer-button'

class CompetitionScreen extends Component {

  render() {

    const { answers, question } = this.props.promoData.competition

    var answerNodes = answers.map((answerData, index) => {
      return (<AnswerButton {...answerData} />)
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
